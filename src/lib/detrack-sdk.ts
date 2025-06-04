import { executeWithResilience } from '@/lib/resilience/failure-handler';
import * as Sentry from '@sentry/nextjs';

// Define a more specific type for the payload if possible, based on Detrack's API.

export interface DetrackJobItemPayload {
  sku?: string; // Required if description is blank
  description?: string; // Required if SKU is blank
  purchase_order_number?: string;
  batch_number?: string;
  expiry_date?: string; // YYYY-MM-DD
  comments?: string;
  quantity?: number;
  unit_of_measure?: string;
  weight?: number; // float
  // Note: Readonly attributes like id, photo_url, serial_numbers are not part of payload
}

export interface DetrackJobPayload {
  // Required fields
  type: 'Delivery' | 'Collection';
  do_number: string;
  date: string; // YYYY-MM-DD
  address: string;

  // Optional fields from Detrack API documentation
  start_date?: string; // YYYY-MM-DD
  job_time?: string; // HH:MM
  time_window?: string; // e.g., "10:00-12:00"
  tracking_number?: string;
  order_number?: string;
  job_type?: string;
  job_sequence?: number; // API doc says string, but often sequence is number. Clarify if needed.
  company_name?: string;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
  billing_address?: string;
  deliver_to_collect_from?: string; // Contact name
  last_name?: string; // Contact last name
  phone_number?: string;
  sender_phone_number?: string;
  fax_number?: string;
  instructions?: string;
  assign_to?: string; // Driver/vehicle name
  notify_email?: string;
  webhook_url?: string;
  zone?: string;
  customer?: string; // Customer name or ID
  account_number?: string;
  job_owner?: string;
  invoice_number?: string;
  invoice_amount?: number; // float in API doc, but often string for currency
  payment_mode?: string;
  payment_amount?: number; // float
  group_id?: string;
  group_name?: string;
  vendor_name?: string;
  source?: string; // e.g., "API", "Portal"
  weight?: number; // integer in API doc for overall job, float for item. Assuming overall.
  parcel_width?: number; // integer
  parcel_length?: number; // integer
  parcel_height?: number; // integer
  cubic_meter?: number; // float
  boxes?: number; // integer
  cartons?: number; // integer
  pieces?: number; // integer
  envelopes?: number; // integer
  pallets?: number; // integer
  bins?: number; // integer
  trays?: number; // integer
  bundles?: number; // integer
  rolls?: number; // integer
  number_of_shipping_labels?: number; // integer
  attachment_url?: string;
  carrier?: string;
  auto_reschedule?: string; // boolean-like string? "true"/"false" or specific values
  eta_time?: string; // HH:MM
  depot?: string;
  depot_contact?: string;
  department?: string;
  sales_person?: string;
  identification_number?: string;
  bank_prefix?: string;
  run_number?: string;
  pick_up_from?: string;
  pick_up_time?: string; // HH:MM
  pick_up_lat?: string;
  pick_up_lng?: string;
  pick_up_address?: string;
  pick_up_address_1?: string;
  pick_up_address_2?: string;
  pick_up_address_3?: string;
  pick_up_city?: string;
  pick_up_state?: string;
  pick_up_country?: string;
  pick_up_postal_code?: string;
  pick_up_zone?: string;
  job_price?: number; // float
  insurance_price?: number; // float
  insurance_coverage?: boolean; // API doc says string, but likely boolean. Clarify.
  total_price?: number; // float
  payer_type?: string;
  remarks?: string;
  service_type?: string;
  warehouse_address?: string;
  destination_time_window?: string;
  door?: string;
  time_zone?: string; // e.g., "Asia/Singapore"
  vehicle_type?: string;
  items?: DetrackJobItemPayload[];
  pod_time?: string; // HH:MM, for manual POD update
  // milestones are usually readonly, not part of creation payload.

  // Allow other properties for flexibility, though aiming for specificity
  [key: string]: any;
}

export interface DetrackJobCreationResponse {
  success: boolean;
  detrackJobId?: string; // Or whatever ID Detrack returns
  // info?: string; // Detrack often returns an 'info' field
  // errors?: any; // Detrack error structure
  error?: string; // Generic error message for our wrapper
  rawResponse?: any; // Store the raw response for debugging if needed
}

const DETRACK_API_PROXY_URL = '/api/detrack/jobs'; // Internal proxy

/**
 * Calls the internal Detrack API proxy to create a job in Detrack.
 * This function is wrapped with resilience.
 *
 * @param payload - The payload for the Detrack job.
 * @returns An object indicating success or failure, and Detrack job ID if successful.
 */
export async function callDetrackCreateJobAPI(
  payload: DetrackJobPayload
): Promise<DetrackJobCreationResponse> {
  
  return executeWithResilience<DetrackJobCreationResponse>({
    featureKey: 'DETRACK_SDK_CREATE_JOB', // Unique key for this specific SDK function
    operation: async () => {
      const response = await fetch(DETRACK_API_PROXY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // The proxy route should return a structured error.
        // We'll capture it and re-throw a more specific error for this SDK layer if needed.
        console.error(
          `Detrack SDK: Proxy call to create job failed. Status: ${response.status}`,
          responseData
        );
        Sentry.captureMessage('Detrack SDK: Proxy call to create job failed', {
          level: 'error',
          extra: { payload, responseStatus: response.status, responseData },
        });
        throw new Error(responseData.error || `Detrack job creation via proxy failed with status ${response.status}`);
      }
      
      // Assuming the proxy returns something like { success: true, job_id: "...", ... } from Detrack
      // or the direct Detrack response which might have an 'info' or 'id' field.
      // Adjust based on actual proxy response structure.
      // For now, let's assume proxy forwards Detrack's success structure or our own.
      if (responseData.success === false || responseData.error) { // Check for explicit error from proxy/Detrack
         return {
          success: false,
          error: responseData.error || responseData.message || 'Unknown error from Detrack proxy.',
          rawResponse: responseData,
        };
      }

      return {
        success: true,
        // Assuming Detrack returns an 'id' or 'job_id' on successful creation via the proxy.
        // This needs to be aligned with what the proxy actually returns from Detrack.
        detrackJobId: responseData.job_id || responseData.id || responseData.detrackJobId, 
        rawResponse: responseData,
      };
    },
    fallback: async (error: Error) => {
      console.error('Detrack SDK: Fallback triggered for createJob.', error);
      Sentry.captureException(error, { tags: { operation: 'DETRACK_SDK_CREATE_JOB_FALLBACK' } });
      return {
        success: false,
        error: error.message || 'Detrack job creation failed after resilience attempts.',
      };
    },
  });
}
