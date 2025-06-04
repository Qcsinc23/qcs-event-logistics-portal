FORMAT: 1A  
HOST: https://app.detrack.com/api/v2

\# Detrack API V2

This describes the resources that make up the official Detrack REST API v2. If you have any problems or requests please contact Detrack support.

\#\# Schema

All timestamps return in ISO 8601 format:

\`YYYY-MM-DDTHH:MM:SSZ\`

\#\# Client Errors

These are the possible error statuses:

\+ Status \`400\` \- Bad request. E.g. Malformed JSON.  
\+ Status \`401\` \- Unauthorized.  
\+ Status \`403\` \- Forbidden. You do not the permission to make the request.  
\+ Status \`404\` \- Record not found.  
\+ Status \`422\` \- Failed to process request because of validation error.  
\+ Status \`429\` \- Exceeded rate limit.

\#\# API key

When using API key, please set the header X-API-KEY with the key.

X-API-KEY: 9943520c80ee2aaad2cc80c29bdfb298e85feed021ef0328

\#\# Rate Limiting

The rate limit allows up to 60 requests per minute. The server will response with status 429 (too many requests) when rate limit exceeded.

\#\# Group Jobs

\#\# Job (object)

Attributes

\+ \`type\` (string) Detrack Job Type. Must be \`Delivery\` / \`Collection\`.  
\+ \`primary\_job\_status\` (string) Primary job status.  
\+ \`open\_to\_marketplace\` (string) Open to marketplace.  
\+ \`marketplace\_offer\` (string) Marketplace offer.  
\+ \`do\_number\` (string required) D.O No.  
\+ \`date\` (date required) Date.  
\+ \`start\_date\` (date) Start date.  
\+ \`status\` (string) Job Status.  
\+ \`job\_release\_time\` (time) Job release time.  
\+ \`job\_time\` (string) Job time.  
\+ \`time\_window\` (string) Time window.  
\+ \`job\_received\_date\` (date) Job received date.  
\+ \`tracking\_number\` (string) Tracking number.  
\+ \`order\_number\` (string) Order number.  
\+ \`job\_type\` (string) Job type.  
\+ \`job\_sequence\` (string) Job order.  
\+ \`job\_fee\` (string) Job fee.  
\+ \`address\_lat\` (string) Address lat.  
\+ \`address\_lng\` (string) Address lng.  
\+ \`address\` (string required) Address.  
\+ \`company\_name\` (string) Address company.  
\+ \`address\_1\` (string) Address 1\.  
\+ \`address\_2\` (string) Address 2\.  
\+ \`address\_3\` (string) Address 3\.  
\+ \`postal\_code\` (string) Postal code.  
\+ \`city\` (string) City.  
\+ \`state\` (string) State.  
\+ \`country\` (string) Country.  
\+ \`billing\_address\` (string) Billing address.  
\+ \`deliver\_to\_collect\_from\` (string) Contact name.  
\+ \`last\_name\` (string) Contact last name.  
\+ \`phone\_number\` (string) Contact phone.  
\+ \`sender\_phone\_number\` (string) Sender phone.  
\+ \`fax\_number\` (string) Fax.  
\+ \`instructions\` (string) Instructions.  
\+ \`assign\_to\` (string) Assign to.  
\+ \`notify\_email\` (string) Notify email.  
\+ \`webhook\_url\` (string) Webhook url.  
\+ \`zone\` (string) Zone.  
\+ \`customer\` (string) Customer.  
\+ \`account\_number\` (string) Account number.  
\+ \`job\_owner\` (string) Owner name.  
\+ \`invoice\_number\` (string) Invoice number.  
\+ \`invoice\_amount\` (string) Invoice amount.  
\+ \`payment\_mode\` (string) Payment mode.  
\+ \`payment\_amount\` (float) Payment amount.  
\+ \`group\_id\` (string) Id of group that the job belongs to.  
\+ \`group\_name\` (string) Group name.  
\+ \`vendor\_name\` (string) Vendor name.  
\+ \`source\` (string) Source.  
\+ \`weight\` (integer) Weight.  
\+ \`parcel\_width\` (integer) Parcel width.  
\+ \`parcel\_length\` (integer) Parcel length.  
\+ \`parcel\_height\` (integer) Parcel height.  
\+ \`cubic\_meter\` (float) Cubic meter.  
\+ \`boxes\` (integer) Boxes.  
\+ \`cartons\` (integer) Cartons.  
\+ \`pieces\` (integer) Pieces.  
\+ \`envelopes\` (integer) Envelopes.  
\+ \`pallets\` (integer) Pallets.  
\+ \`bins\` (integer) Bins.  
\+ \`trays\` (integer) Trays.  
\+ \`bundles\` (integer) Bundles.  
\+ \`rolls\` (integer) Rolls.  
\+ \`number\_of\_shipping\_labels\` (integer) Labels.  
\+ \`attachment\_url\` (string) Attachment 1\.  
\+ \`carrier\` (string) Carrier.  
\+ \`auto\_reschedule\` (string) Reschedule.  
\+ \`eta\_time\` (time) Eta time.  
\+ \`depot\` (string) Depot.  
\+ \`depot\_contact\` (string) Depot contact.  
\+ \`department\` (string) Department.  
\+ \`sales\_person\` (string) Sales person.  
\+ \`identification\_number\` (string) Identification number.  
\+ \`bank\_prefix\` (string) Bank prefix.  
\+ \`run\_number\` (string) Run number.  
\+ \`pick\_up\_from\` (string) Pick up from.  
\+ \`pick\_up\_time\` (string) Pick up time.  
\+ \`pick\_up\_lat\` (string) Pick up lat.  
\+ \`pick\_up\_lng\` (string) Pick up lng.  
\+ \`pick\_up\_address\` (string) Pick up address.  
\+ \`pick\_up\_address\_1\` (string) Pick up address 1\.  
\+ \`pick\_up\_address\_2\` (string) Pick up address 2\.  
\+ \`pick\_up\_address\_3\` (string) Pick up address 3\.  
\+ \`pick\_up\_city\` (string) Pick up city.  
\+ \`pick\_up\_state\` (string) Pick up state.  
\+ \`pick\_up\_country\` (string) Pick up country.  
\+ \`pick\_up\_postal\_code\` (string) Pick up postal code.  
\+ \`pick\_up\_zone\` (string) Pick up zone.  
\+ \`job\_price\` (float) Job price.  
\+ \`insurance\_price\` (float) Insurance price.  
\+ \`insurance\_coverage\` (string) Insured.  
\+ \`total\_price\` (float) Total price.  
\+ \`payer\_type\` (string) Payer type.  
\+ \`remarks\` (string) Remarks.  
\+ \`service\_type\` (string) Service type.  
\+ \`warehouse\_address\` (string) Warehouse address.  
\+ \`destination\_time\_window\` (string) Destination timeslot.  
\+ \`door\` (string) Door.  
\+ \`time\_zone\` (string) Time zone.  
\+ \`vehicle\_type\` (string) Vehicle type.  
\+ \`items\` (array\[Item\]) Array of items.  
\+ \`pod\_time\` (time) POD time for manual update in format HH:MM (13:30).  
\+ \`milestones\` (array\[Milestone\]) Array of milestones.

Readonly Attributes

\+ \`id\` (string) Job Id.  
\+ \`job\_age\` (string) Job age.  
\+ \`detrack\_number\` (string) Detrack number.  
\+ \`tracking\_status\` (string) Tracking status.  
\+ \`shipper\_name\` (string) Shipper name.  
\+ \`reason\` (string) Reason.  
\+ \`last\_reason\` (string) Last reason.  
\+ \`received\_by\_sent\_by\` (string) Received by.  
\+ \`note\` (string) Note.  
\+ \`live\_eta\` (string) Live eta.  
\+ \`pod\_lat\` (string) Pod lat.  
\+ \`pod\_lng\` (string) Pod lng.  
\+ \`pod\_address\` (string) Pod address.  
\+ \`info\_received\_at\` (time) Info received at.  
\+ \`head\_to\_pick\_up\_at\` (time) Head to pick up at.  
\+ \`pick\_up\_at\` (time) Pick up at.  
\+ \`scheduled\_at\` (time) Scheduled at.  
\+ \`at\_warehouse\_at\` (time) At warehouse at.  
\+ \`out\_for\_delivery\_at\` (time) Out for delivery at.  
\+ \`head\_to\_delivery\_at\` (time) Head to delivery at.  
\+ \`cancelled\_at\` (time) Cancelled at.  
\+ \`pick\_up\_failed\_count\` (time) Pick up failed count.  
\+ \`deliver\_failed\_count\` (time) Deliver failed count.  
\+ \`pick\_up\_assign\_to\` (string) Pick up assign to.  
\+ \`pick\_up\_reason\` (string) Pick up reason.  
\+ \`pod\_at\` (time) Pod at.  
\+ \`texted\_at\` (time) Texted at.  
\+ \`called\_at\` (time) Called at.  
\+ \`address\_tracked\_at\` (time) Address tracked at.  
\+ \`arrived\_lat\` (float) Arrived lat.  
\+ \`arrived\_lng\` (float) Arrived lng.  
\+ \`arrived\_address\` (string) Arrived address.  
\+ \`arrived\_at\` (time) Arrived at.  
\+ \`serial\_number\` (string) Serial number.  
\+ \`signed\_at\` (time) Signed at.  
\+ \`photo\_1\_at\` (time) Photo 1 at.  
\+ \`photo\_2\_at\` (time) Photo 2 at.  
\+ \`photo\_3\_at\` (time) Photo 3 at.  
\+ \`photo\_4\_at\` (time) Photo 4 at.  
\+ \`photo\_5\_at\` (time) Photo 5 at.  
\+ \`photo\_6\_at\` (time) Photo 6 at.  
\+ \`photo\_7\_at\` (time) Photo 7 at.  
\+ \`photo\_8\_at\` (time) Photo 8 at.  
\+ \`photo\_9\_at\` (time) Photo 9 at.  
\+ \`photo\_10\_at\` (time) Photo 10 at.  
\+ \`signature\_file\_url\` (string) Signature file URL.  
\+ \`photo\_1\_file\_url\` (string) Photo 1 file URL.  
\+ \`photo\_2\_file\_url\` (string) Photo 2 file URL.  
\+ \`photo\_3\_file\_url\` (string) Photo 3 file URL.  
\+ \`photo\_4\_file\_url\` (string) Photo 4 file URL.  
\+ \`photo\_5\_file\_url\` (string) Photo 5 file URL.  
\+ \`photo\_6\_file\_url\` (string) Photo 6 file URL.  
\+ \`photo\_7\_file\_url\` (string) Photo 7 file URL.  
\+ \`photo\_8\_file\_url\` (string) Photo 8 file URL.  
\+ \`photo\_9\_file\_url\` (string) Photo 9 file URL.  
\+ \`photo\_10\_file\_url\` (string) Photo 10 file URL.  
\+ \`actual\_weight\` (integer) Actual weight.  
\+ \`temperature\` (integer) Temperature.  
\+ \`hold\_time\` (integer) Hold time.  
\+ \`payment\_collected\` (float) Payment collected.  
\+ \`actual\_crates\` (integer) Actual crates.  
\+ \`actual\_pallets\` (integer) Actual pallets.  
\+ \`actual\_utilization\` (integer) Actual utilization.  
\+ \`attempt\` (integer) Attempt.  
\+ \`goods\_service\_rating\` (integer) Goods service rating.  
\+ \`driver\_rating\` (integer) Driver rating.  
\+ \`customer\_feedback\` (string) Feedback remarks.  
\+ \`items\_count\` (integer) Items count.  
\+ \`tracking\_link\` (string) Link to tracking wiget.

\#\# Job Item (object)

\+ \`sku\` (string) SKU. Required if description is blank.  
\+ \`description\` (string) Description. Required if SKU is blank.  
\+ \`purchase\_order\_number\` (string) Purchase order number.  
\+ \`batch\_number\` (string) Batch number.  
\+ \`expiry\_date\` (string) Expiry.  
\+ \`comments\` (string) Comments.  
\+ \`quantity\` (integer) Quantity.  
\+ \`unit\_of\_measure\` (string) Unit of measure.  
\+ \`checked\` (boolean) Checked.  
\+ \`actual\_quantity\` (integer) Actual quantity.  
\+ \`inbound\_quantity\` (integer) Inbound quantity.  
\+ \`unload\_time\_estimate\` (string) Unload time estimate.  
\+ \`unload\_time\_actual\` (string) Unload time actual.  
\+ \`follow\_up\_quantity\` (integer) Follow up quantity.  
\+ \`follow\_up\_reason\` (string) Follow up reason.  
\+ \`rework\_quantity\` (integer) Rework quantity.  
\+ \`rework\_reason\` (string) Rework reason.  
\+ \`weight\` (float) Weight.

Readonly Attribute

\+ \`id\` (string) Job item id.  
\+ \`photo\_url\` (string) Photo URL.  
\+ \`serial\_numbers\` (array\[string\]) Serial numbers.

\#\# Milestone (object)

\+ \`status\` (string) Status. Job status.  
\+ \`assign\_to\` (string) Driver.  
\+ \`reason\` (string) Reason for failed job.  
\+ \`pod\_at\` (time) Time of status change.  
\+ \`created\_at\` (time) Time of milestone created.  
\+ \`user\_name\` (string) Name of user.

\#\# List / Create \[/dn/jobs{?page}{?limit}{?sort}{?type}{?date}{?assign\_to}{?status}{?do\_number}{?query}\]

\#\#\# List \[GET\]

\+ Parameters

    \+ \`page\`: \`2\` (number, optional) \- Page number.  
        \+ default: \`1\`

    \+ \`limit\`: \`50\` (number, optional) \- Number of records per page. Maximum 100\.  
        \+ default: \`20\`

    \+ \`sort\`: \`-created\_at\` (string, optional) \- Attribute to be sorted. Add minus \`-\` for descending order.

    \+ \`date\`: \`2018-06-08\` (date, optional) \- Filter jobs by date (YYYY-MM-DD).

    \+ \`type\`: \`Delivery\` (string, optional) \- Filter jobs by type (\`Delivery\` / \`Collection\`).

    \+ \`assign\_to\`: \`Driver A\` (string) \- Filter jobs by assign\_to.

    \+ \`status\`: \`completed,completed\_partial,failed\` (string) \- Filter jobs by status. Use comma to seperate multiple statuses.

    \+ \`do\_number\`: \`DO12345\` (string) \- Filter jobs by DO number.

    \+ \`query\`: \`DO12345\` (string) \- Query to search jobs for DO number, address, delivery to, notify email, assign to, tracking number and zone.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": \[  
                    {  
                        "id": "5b22055510c92b1a046ece04",  
                        "type": "Delivery",  
                        "primary\_job\_status": "dispatched",  
                        "open\_to\_marketplace": false,  
                        "marketplace\_offer": null,  
                        "do\_number": "DO 0",  
                        "attempt": 1,  
                        "date": "2018-06-14",  
                        "start\_date": "2018-06-14",  
                        "job\_age": 1,  
                        "job\_release\_time": null,  
                        "job\_time": null,  
                        "time\_window": null,  
                        "job\_received\_date": null,  
                        "tracking\_number": "T0",  
                        "order\_number": "ORN12345678",  
                        "job\_type": null,  
                        "job\_sequence": null,  
                        "job\_fee": null,  
                        "address\_lat": null,  
                        "address\_lng": null,  
                        "address": "Singapore 470140",  
                        "company\_name": null,  
                        "address\_1": null,  
                        "address\_2": null,  
                        "address\_3": null,  
                        "postal\_code": "470140",  
                        "city": null,  
                        "state": null,  
                        "country": null,  
                        "geocoded\_lat": 1.33668219002454,  
                        "geocoded\_lng": 103.910711702473,  
                        "billing\_address": null,  
                        "deliver\_to\_collect\_from": "James Li",  
                        "last\_name": null,  
                        "phone\_number": "65432178",  
                        "sender\_phone\_number": null,  
                        "fax\_number": "65432179",  
                        "instructions": null,  
                        "assign\_to": null,  
                        "notify\_email": "test@example.com",  
                        "webhook\_url": null,  
                        "zone": null,  
                        "customer": null,  
                        "account\_number": null,  
                        "job\_owner": null,  
                        "invoice\_number": null,  
                        "invoice\_amount": null,  
                        "payment\_mode": null,  
                        "payment\_amount": null,  
                        "group\_name": null,  
                        "vendor\_name": null,  
                        "shipper\_name": null,  
                        "source": null,  
                        "weight": null,  
                        "parcel\_width": null,  
                        "parcel\_length": null,  
                        "parcel\_height": null,  
                        "cubic\_meter": null,  
                        "boxes": null,  
                        "cartons": null,  
                        "pieces": null,  
                        "envelopes": null,  
                        "pallets": null,  
                        "bins": null,  
                        "trays": null,  
                        "bundles": null,  
                        "rolls": null,  
                        "number\_of\_shipping\_labels": null,  
                        "attachment\_url": null,  
                        "detrack\_number": "DET2000001",  
                        "status": "dispatched",  
                        "tracking\_status": "Info received",  
                        "reason": null,  
                        "last\_reason": null,  
                        "received\_by\_sent\_by": null,  
                        "note": null,  
                        "carrier": null,  
                        "pod\_lat": "",  
                        "pod\_lng": "",  
                        "pod\_address": "",  
                        "address\_tracked\_at": null,  
                        "arrived\_lat": null,  
                        "arrived\_lng": null,  
                        "arrived\_address": null,  
                        "arrived\_at": null,  
                        "texted\_at": null,  
                        "called\_at": null,  
                        "serial\_number": null,  
                        "signed\_at": null,  
                        "photo\_1\_at": null,  
                        "photo\_2\_at": null,  
                        "photo\_3\_at": null,  
                        "photo\_4\_at": null,  
                        "photo\_5\_at": null,  
                        "signature\_file\_url": null,  
                        "photo\_1\_file\_url": null,  
                        "photo\_2\_file\_url": null,  
                        "photo\_3\_file\_url": null,  
                        "photo\_4\_file\_url": null,  
                        "photo\_5\_file\_url": null,  
                        "actual\_weight": null,  
                        "temperature": null,  
                        "hold\_time": null,  
                        "payment\_collected": null,  
                        "auto\_reschedule": null,  
                        "actual\_crates": null,  
                        "actual\_pallets": null,  
                        "actual\_utilization": null,  
                        "goods\_service\_rating": null,  
                        "driver\_rating": null,  
                        "customer\_feedback": null,  
                        "eta\_time": null,  
                        "live\_eta": null,  
                        "depot": null,  
                        "depot\_contact": null,  
                        "department": null,  
                        "sales\_person": null,  
                        "identification\_number": null,  
                        "bank\_prefix": null,  
                        "run\_number": null,  
                        "pick\_up\_from": null,  
                        "pick\_up\_time": null,  
                        "pick\_up\_lat": null,  
                        "pick\_up\_lng": null,  
                        "pick\_up\_address": null,  
                        "pick\_up\_address\_1": null,  
                        "pick\_up\_address\_2": null,  
                        "pick\_up\_address\_3": null,  
                        "pick\_up\_city": null,  
                        "pick\_up\_state": null,  
                        "pick\_up\_country": null,  
                        "pick\_up\_postal\_code": null,  
                        "pick\_up\_zone": null,  
                        "pick\_up\_assign\_to": null,  
                        "pick\_up\_reason": null,  
                        "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                        "pick\_up\_at": null,  
                        "scheduled\_at": null,  
                        "at\_warehouse\_at": null,  
                        "out\_for\_delivery\_at": null,  
                        "head\_to\_pick\_up\_at": null,  
                        "head\_to\_delivery\_at": null,  
                        "cancelled\_at": null,  
                        "pod\_at": null,  
                        "pick\_up\_failed\_count": null,  
                        "deliver\_failed\_count": null,  
                        "job\_price": null,  
                        "insurance\_price": null,  
                        "insurance\_coverage": false,  
                        "total\_price": null,  
                        "payer\_type": null,  
                        "remarks": null,  
                        "items\_count": 2,  
                        "service\_type": null,  
                        "warehouse\_address": null,  
                        "destination\_time\_window": null,  
                        "door": null,  
                        "time\_zone": null,  
                        "vehicle\_type": null,  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "items": \[{  
                            "id": "5b22055510c92b1a046ece05",  
                            "sku": "12345678",  
                            "purchase\_order\_number": null,  
                            "batch\_number": null,  
                            "expiry\_date": null,  
                            "description": null,  
                            "comments": null,  
                            "quantity": 10,  
                            "unit\_of\_measure": null,  
                            "checked": false,  
                            "actual\_quantity": null,  
                            "inbound\_quantity": null,  
                            "unload\_time\_estimate": null,  
                            "unload\_time\_actual": null,  
                            "follow\_up\_quantity": null,  
                            "follow\_up\_reason": null,  
                            "rework\_quantity": null,  
                            "rework\_reason": null,  
                            "reject\_quantity": 0,  
                            "reject\_reason": null,  
                            "weight": null,  
                            "serial\_numbers": \[\],  
                            "photo\_url": null  
                        }, {  
                            "id": "5b22055510c92b1a046ece06",  
                            "sku": "12387654",  
                            "purchase\_order\_number": null,  
                            "batch\_number": null,  
                            "expiry\_date": null,  
                            "description": null,  
                            "comments": null,  
                            "quantity": 5,  
                            "unit\_of\_measure": null,  
                            "checked": false,  
                            "actual\_quantity": null,  
                            "inbound\_quantity": null,  
                            "unload\_time\_estimate": null,  
                            "unload\_time\_actual": null,  
                            "follow\_up\_quantity": null,  
                            "follow\_up\_reason": null,  
                            "rework\_quantity": null,  
                            "rework\_reason": null,  
                            "reject\_quantity": 0,  
                            "reject\_reason": null,  
                            "weight": null,  
                            "serial\_numbers": \[\],  
                            "photo\_url": null  
                        }\],  
                        "milestones": \[{  
                            "status": "info\_recv",  
                            "assign\_to": null,  
                            "reason": null,  
                            "pod\_at": "2018-06-14T06:04:06.017Z",  
                            "created\_at": "2018-06-14T06:04:06.017Z",  
                            "user\_name": "Simon"  
                        }\]  
                    }  
                \],  
                "links": {  
                    "next": "https://app.detrack.com/api/v2/dn/jobs?page=2\&limit=10",  
                    "prev": null  
                }  
            }

\#\#\# Create \[POST\]

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece04",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\]  
                }  
            }

\+ Response 201 (application/json)

    \+ Headers

            Location: https://app.detrack.com/api/v2/dn/jobs/{do\_number}

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece04",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\],  
                    "milestones": \[{  
                        "status": "info\_recv",  
                        "assign\_to": null,  
                        "reason": null,  
                        "pod\_at": "2018-06-14T06:04:06.017Z",  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "user\_name": "Simon"  
                    }\]

                }  
            }

\#\# Batch Create \[/dn/jobs/bulk\]

Create up to 100 jobs per request.

\#\#\# Create \[POST\]

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": \[  
                  {  
                    "type": "Delivery",  
                    "do\_number": "DO 0",  
                    "date": "2018-06-14",  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "address": "Singapore 470140",  
                    "deliver\_to\_collect\_from": "James Li",  
                    "phone\_number": "65432178",  
                    "fax\_number": "65432179",  
                    "notify\_email": "test@test.com",  
                    "items": \[{  
                        "sku": "12345678",  
                        "description": "iPad",  
                        "quantity": 10  
                    }, {  
                        "sku": "12345688",  
                        "description": "iPhone",  
                        "quantity": 10  
                    }\]  
                  },  
                  {  
                    "type": "Delivery",  
                    "do\_number": "DO 1",  
                    "date": "2018-06-14",  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345688",  
                    "address": "Singapore 470150",  
                    "deliver\_to\_collect\_from": "Simon Loh",  
                    "phone\_number": "65432178",  
                    "fax\_number": "65432179",  
                    "notify\_email": "simon@test.com",  
                    "items": \[{  
                        "sku": "12345678",  
                        "description": "iPad",  
                        "quantity": 10  
                    }, {  
                        "sku": "12345688",  
                        "description": "iPhone",  
                        "quantity": 10  
                    }\]  
                  }  
                \]  
            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": \[  
                  {  
                    "id": "5b28c8e810c92b1fe0f9571a",  
                    "type": "Delivery",  
                    "do\_number": "DO 0",  
                    "date": "2018-06-14",  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "address": "Singapore 470140",  
                    "deliver\_to\_collect\_from": "James Li",  
                    "phone\_number": "65432178",  
                    "fax\_number": "65432179",  
                    "notify\_email": "test@test.com",  
                    "items": \[{  
                        "id": "5b28c8e810c92b1fe0f9571e",  
                        "sku": "12345678",  
                        "description": "iPad",  
                        "quantity": 10  
                    }, {  
                        "id": "5b28c8e810c92b1fe0f9571f",  
                        "sku": "12345688",  
                        "description": "iPhone",  
                        "quantity": 10  
                    }\]  
                  },  
                  {  
                    "id": "5b28c8e810c92b1fe0f9571b",  
                    "type": "Delivery",  
                    "do\_number": "DO 1",  
                    "date": "2018-06-14",  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345688",  
                    "address": "Singapore 470150",  
                    "deliver\_to\_collect\_from": "Simon Loh",  
                    "phone\_number": "65432178",  
                    "fax\_number": "65432179",  
                    "notify\_email": "simon@test.com",  
                    "items": \[{  
                        "id": "5b28c8e810c92b1fe0f9571c",  
                        "sku": "12345678",  
                        "description": "iPad",  
                        "quantity": 10  
                    }, {  
                        "id": "5b28c8e810c92b1fe0f9571d",  
                        "sku": "12345688",  
                        "description": "iPhone",  
                        "quantity": 10  
                    }\]  
                  }  
                \]  
            }

\+ Response 422 (application/json)

    \+ Body

            {  
                "code": "validation\_failed",  
                "message": "Validation failed",  
                "data": \[  
                  {  
                    "id": "5b28c8e810c92b1fe0f9571a",  
                    "type": "Delivery",  
                    "do\_number": "DO 0",  
                    "date": "2018-06-14",  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "address": "Singapore 470140",  
                    "deliver\_to\_collect\_from": "James Li",  
                    "phone\_number": "65432178",  
                    "fax\_number": "65432179",  
                    "notify\_email": "test@test.com",  
                    "items": \[{  
                        "id": "5b28c8e810c92b1fe0f9571e",  
                        "sku": "12345678",  
                        "description": "iPad",  
                        "quantity": 10  
                    }, {  
                        "id": "5b28c8e810c92b1fe0f9571f",  
                        "sku": "12345688",  
                        "description": "iPhone",  
                        "quantity": 10  
                    }\]  
                  }  
                \],  
                errors: \[  
                  {  
                    "id": "5b28c8e810c92b1fe0f9571b",  
                    "type": "Delivery",  
                    "do\_number": "",  
                    "date": "2018-06-14",  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345688",  
                    "address": "Singapore 470150",  
                    "deliver\_to\_collect\_from": "Simon Loh",  
                    "phone\_number": "65432178",  
                    "fax\_number": "65432179",  
                    "notify\_email": "simon@test.com",  
                    "items": \[{  
                        "id": "5b28c8e810c92b1fe0f9571c",  
                        "sku": "12345678",  
                        "description": "iPad",  
                        "quantity": 10  
                    }, {  
                        "id": "5b28c8e810c92b1fe0f9571d",  
                        "sku": "12345688",  
                        "description": "iPhone",  
                        "quantity": 10  
                    }\],  
                    errors: \[  
                      { field: 'do\_number', codes: \['cannot be blank'\]}  
                    \]  
                  }  
                \]  
            }

\#\# Batch Update / Delete \[/dn/jobs\]

Update / Delete up to 100 jobs per request.

\#\# Update (object)

\+ \`do\_number\` (string required) \- D.O No.  
\+ \`date\` (date, optional) \- Date.  
\+ \`type\` (string, optional) \- Detrack Job Type. Must be \`Delivery\` / \`Collection\`.  
\+ \`data\` (object) \- Job object with fields and values to be updated.  
\+ \`overwrite\` (boolean, optional) \- Set to \`true\` if you would like to overwrite completed jobs.

\#\# Delete (object)

\+ \`do\_number\` (string required) D.O No.  
\+ \`date\` (date, optional) Date.  
\+ \`type\` (string, optional) Detrack Job Type. Must be \`Delivery\` or \`Collection\`.

\#\#\# Update \[PUT\]

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": \[  
                    {  
                        "do\_number": "5b22055510c92b1a046ece05",  
                        "type": "Delivery",  
                        "overwrite": true,  
                        "data": { "job\_sequence": 1 }  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece06",  
                        "date": "2020-08-20",  
                        "type": "Delivery",  
                        "data": { "job\_sequence": 2 }  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece07",  
                        "type": "Delivery",  
                        "data": { "job\_sequence": 3 }  
                    }  
                \]  
            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": \[  
                    {  
                        "do\_number": "5b22055510c92b1a046ece05",  
                        "date": null,  
                        "type": "Delivery",  
                        "ok": true  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece06",  
                        "date": "2020-08-20",  
                        "type": "Delivery",  
                        "ok": true  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece07",  
                        "date": null,  
                        "type": "Delivery",  
                        "ok": true  
                    }  
                \]  
            }

\+ Response 422 (application/json)

    \+ Body

            {  
                "data": {  
                    "data": \[  
                        {  
                            "do\_number": "5b22055510c92b1a046ece05",  
                            "date": null,  
                            "type": "Delivery",  
                            "ok": true  
                        },  
                        {  
                            "do\_number": "5b22055510c92b1a046ece06",  
                            "date": null,  
                            "type": "Delivery",  
                            "ok": true  
                        },  
                        {  
                            "do\_number": "5b22055510c92b1a046ece07",  
                            "date": null,  
                            "type": "Delivery",  
                            "ok": false  
                        }  
                    \]  
                },  
                "code": "validation\_failed",  
                "message": "Validation failed",  
                "errors": \[{  
                    "do\_number": "5b22055510c92b1a046ece07",  
                    "date": null,  
                    "type": "Delivery",  
                    "field": "job\_sequence",  
                    "codes": \["not\_a\_number"\]  
                }\]

            }

\#\#\# Delete \[DELETE\]

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": \[  
                    {  
                        "do\_number": "5b22055510c92b1a046ece05",  
                        "date": "2019-03-08",  
                        "type": "Delivery"  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece06"  
                        "date": "2019-03-08",  
                        "type": "Delivery"  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece07"  
                        "date": "2019-03-08",  
                        "type": "Delivery"  
                    }  
                \]  
            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": \[  
                    {  
                        "do\_number": "5b22055510c92b1a046ece05",  
                        "date": "2019-03-08",  
                        "type": "Delivery",  
                        "ok": true  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece06",  
                        "date": "2019-03-08",  
                        "type": null,  
                        "ok": true  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece07",  
                        "date": "2019-03-08",  
                        "type": null,  
                        "ok": true  
                    }  
                \]  
            }

\+ Response 422 (application/json)

    \+ Body

            {  
                "data": \[  
                    {  
                        "do\_number": "5b22055510c92b1a046ece05",  
                        "date": "2019-03-08",  
                        "type": "Delivery",  
                        "ok": true  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece06",  
                        "date": "2019-03-08",  
                        "type": null,  
                        "ok": true  
                    },  
                    {  
                        "do\_number": "5b22055510c92b1a046ece07",  
                        "date": "2019-03-08",  
                        "type": null,  
                        "ok": false  
                    }  
                \],  
                "code": "deletion\_failed",  
                "message": "Deletion failed",  
                "errors": \[{  
                    "do\_number": "5b22055510c92b1a046ece07",  
                    "date": "2019-03-08",  
                    "type": null,  
                    "codes": \["undeletable"\]  
                }\]  
            }

\#\# Batch Export \[/dn/jobs/bulk/export\]

This is for exporting of shipping labels or pod in batches by providing a list of DO number in the query object and an optional date.  
It will response with an URL for checking the progress of the export. . Limited to 1000 jobs per request.

\#\# Export (object)

\+ \`query\` (object required) \- Query object.  
\+ \`document\` (string, required) \- Document Type. Must be \`shipping-labels\` / \`pod\`. Defaults to \`pod\`.

\#\# Query (object)

\+ \`do\_numbers\` (array\[String\] required) \- Array of D.O nos.  
\+ \`date\` (date optional) \- Job date.  
\+ \`type\` (string optional) \- Filter the export by type. Must be \`Delivery\` / \`Collection\`. If blank, both delivery and collection will be exported.

\#\#\# Export \[POST\]

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": {  
                    "query": {  
                        "do\_numbers": \[  
                            "123456",  
                            "654321"  
                        \],  
                        "date": "2022-02-22"  
                    },  
                    "document": "shipping-labels"  
                }

            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "status\_url": "https://app.detrack.com/api/v2/dn/jobs/export/status/5b22033310c92b1a086ece03"  
                }  
            }

\#\# Get Export Status \[/dn/jobs/export/status/{id}\]

This is for checking the progress of the batch export. It will provide a download URL once exporting has completed. You may then use the download URL to download the exported file.

\#\#\# Get Status \[GET\]

\+ Parameters

    \+ id: \`5b22033310c92b1a086ece03\` (string, required) \- Id of export.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "status": "completed",  
                    "download\_url": "https://detrack-exports.s3.dualstack.us-west-2.amazonaws.com/eb38494bd8a30498e76c890f/shipping-labels.pdf?response-content-disposition=attachment%3Bfilename%3Dshipping-labels.pdf\&X-Amz-Algorithm=AWS4-HMAC-SHA256\&X-Amz-Credential=AKIAJMOL6O2EG6TY2XCA%2F20220223%2Fus-west-2%2Fs3%2Faws4\_request\&X-Amz-Date=20220223T004851Z\&X-Amz-Expires=900\&X-Amz-SignedHeaders=host\&X-Amz-Signature=5778549def8fd9c2ed45b9bf75618c69c2b856683b2a9ad3fa3bb5e3df387d96"  
                }  
            }

\#\# Retreive Job by DO \[/dn/jobs/show/{?do\_number}{?date}{?type}\]

\#\#\# Retreive \[GET\]

\+ Parameters

    \+ do\_number: \`12345678\` (string, required) \- Job DO number to be retreived.  
    \+ date: \`2021-04-09\` (string, optional) \- Date of job.  
    \+ type: \`Delivery\` (string, optional) \- Detrack Job Type to be retreived. Must be \`Delivery\` or \`Collection\`.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece04",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\],  
                    "milestones": \[{  
                        "status": "info\_recv",  
                        "assign\_to": null,  
                        "reason": null,  
                        "pod\_at": "2018-06-14T06:04:06.017Z",  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "user\_name": "Simon"  
                    }\]  
                }  
            }

\#\# Update Job by DO \[/dn/jobs/update\]

\#\# Update (object)

\+ \`do\_number\` (string required) \- D.O No.  
\+ \`date\` (date, optional) \- Date.  
\+ \`type\` (string, optional) \- Detrack Job Type. Must be \`Delivery\` / \`Collection\`.  
\+ \`data\` (object) \- Job object with fields and values to be updated.

\#\#\# Update \[PUT\]

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "do\_number": "12345678",  
                "date": "2021-04-09",  
                "type": "Delivery",  
                "data": {  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\]  
                }  
            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece04",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\],  
                    "milestones": \[{  
                        "status": "info\_recv",  
                        "assign\_to": null,  
                        "reason": null,  
                        "pod\_at": "2018-06-14T06:04:06.017Z",  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "user\_name": "Simon"  
                    }\]  
                }  
            }

\#\# Delete Job By DO \[/dn/jobs/delete{?do\_number}{?date}{?type}\]

\#\#\# Delete \[DELETE\]

\+ Parameters

    \+ do\_number: \`12345678\` (string, required) \- Job DO number to be retreived.  
    \+ date: \`2021-04-09\` (string, optional) \- Date of job.  
    \+ type: \`Delivery\` (string, optional) \- Detrack Job Type to be retreived. Must be \`Delivery\` or \`Collection\`.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

\+ Response 204 (application/json)

\#\# Retreive / Update / Delete by DO \[/dn/jobs/{do\_number}{?type}\]

\#\#\# Retreive \[GET\]

\+ Parameters

    \+ type: \`Delivery\` (string, optional) \- Detrack Job Type to be retreived. Must be \`Delivery\` or \`Collection\`.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece04",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\],  
                    "milestones": \[{  
                        "status": "info\_recv",  
                        "assign\_to": null,  
                        "reason": null,  
                        "pod\_at": "2018-06-14T06:04:06.017Z",  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "user\_name": "Simon"  
                    }\]  
                }  
            }

\#\#\# Update \[PUT\]

\+ Parameters

    \+ type: \`Delivery\` (string, optional) \- Detrack Job Type to be updated. Must be \`Delivery\` or \`Collection\`.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": {  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\]  
                }  
            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece04",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\],  
                    "milestones": \[{  
                        "status": "info\_recv",  
                        "assign\_to": null,  
                        "reason": null,  
                        "pod\_at": "2018-06-14T06:04:06.017Z",  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "user\_name": "Simon"  
                    }\]  
                }  
            }

\#\#\# Delete \[DELETE\]

\+ Parameters

    \+ type: \`Delivery\` (string, optional) \- Detrack Job Type to be deleted. Must be \`Delivery\` or \`Collection\`.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

\+ Response 204 (application/json)

\#\# Retreive / Update / Delete by DO and Date \[/dn/jobs/{do\_number}/{date}{?type}\]

\#\#\# Retreive \[GET\]

\+ Parameters

    \+ type: \`Delivery\` (string, optional) \- Detrack Job Type to be retreived. Must be \`Delivery\` or \`Collection\`.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece04",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\],  
                    "milestones": \[{  
                        "status": "info\_recv",  
                        "assign\_to": null,  
                        "reason": null,  
                        "pod\_at": "2018-06-14T06:04:06.017Z",  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "user\_name": "Simon"  
                    }\]  
                }  
            }

\#\#\# Update \[PUT\]

\+ Parameters

    \+ type: \`Delivery\` (string, optional) \- Detrack Job Type to be updated. Must be \`Delivery\` or \`Collection\`.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": {  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\]  
                }  
            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece04",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\],  
                    "milestones": \[{  
                        "status": "info\_recv",  
                        "assign\_to": null,  
                        "reason": null,  
                        "pod\_at": "2018-06-14T06:04:06.017Z",  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "user\_name": "Simon"  
                    }\]  
                }  
            }

\#\#\# Delete \[DELETE\]

\+ Parameters

    \+ type: \`Delivery\` (string, optional) \- Detrack Job Type to be deleted. Must be \`Delivery\` or \`Collection\`.

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

\+ Response 204 (application/json)

\#\# Reattempt \[/dn/jobs/reattempt\]

\+ \`do\_number\` (string required) D.O No.  
\+ \`date\` (date) Date.  
\+ \`new\_date\` (date) Date of the reattempt if different from date.  
\+ \`type\` (string) Detrack Job Type.

\#\#\# Reattempt \[POST\]

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": {  
                    "do\_number": "5b22055510c92b1a046ece18",  
                    "date": "2019-03-08",  
                    "type": "Delivery",  
                    "new\_date": "2019-03-18"  
                }  
            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": {  
                    "id": "5b22055510c92b1a046ece18",  
                    "type": "Delivery",  
                    "primary\_job\_status": "dispatched",  
                    "open\_to\_marketplace": false,  
                    "marketplace\_offer": null,  
                    "do\_number": "DO 0",  
                    "attempt": 1,  
                    "date": "2018-06-14",  
                    "start\_date": "2018-06-14",  
                    "job\_age": 1,  
                    "job\_release\_time": null,  
                    "job\_time": null,  
                    "time\_window": null,  
                    "job\_received\_date": null,  
                    "tracking\_number": "T0",  
                    "order\_number": "ORN12345678",  
                    "job\_type": null,  
                    "job\_sequence": null,  
                    "job\_fee": null,  
                    "address\_lat": null,  
                    "address\_lng": null,  
                    "address": "Singapore 470140",  
                    "company\_name": null,  
                    "address\_1": null,  
                    "address\_2": null,  
                    "address\_3": null,  
                    "postal\_code": "470140",  
                    "city": null,  
                    "state": null,  
                    "country": null,  
                    "geocoded\_lat": 1.33668219002454,  
                    "geocoded\_lng": 103.910711702473,  
                    "billing\_address": null,  
                    "deliver\_to\_collect\_from": "James Li",  
                    "last\_name": null,  
                    "phone\_number": "65432178",  
                    "sender\_phone\_number": null,  
                    "fax\_number": "65432179",  
                    "instructions": null,  
                    "assign\_to": null,  
                    "notify\_email": "test@example.com",  
                    "webhook\_url": null,  
                    "zone": null,  
                    "customer": null,  
                    "account\_number": null,  
                    "job\_owner": null,  
                    "invoice\_number": null,  
                    "invoice\_amount": null,  
                    "payment\_mode": null,  
                    "payment\_amount": null,  
                    "group\_name": null,  
                    "vendor\_name": null,  
                    "shipper\_name": null,  
                    "source": null,  
                    "weight": null,  
                    "parcel\_width": null,  
                    "parcel\_length": null,  
                    "parcel\_height": null,  
                    "cubic\_meter": null,  
                    "boxes": null,  
                    "cartons": null,  
                    "pieces": null,  
                    "envelopes": null,  
                    "pallets": null,  
                    "bins": null,  
                    "trays": null,  
                    "bundles": null,  
                    "rolls": null,  
                    "number\_of\_shipping\_labels": null,  
                    "attachment\_url": null,  
                    "detrack\_number": "DET2000001",  
                    "status": "dispatched",  
                    "tracking\_status": "Info received",  
                    "reason": null,  
                    "last\_reason": null,  
                    "received\_by\_sent\_by": null,  
                    "note": null,  
                    "carrier": null,  
                    "pod\_lat": "",  
                    "pod\_lng": "",  
                    "pod\_address": "",  
                    "address\_tracked\_at": null,  
                    "arrived\_lat": null,  
                    "arrived\_lng": null,  
                    "arrived\_address": null,  
                    "arrived\_at": null,  
                    "texted\_at": null,  
                    "called\_at": null,  
                    "serial\_number": null,  
                    "signed\_at": null,  
                    "photo\_1\_at": null,  
                    "photo\_2\_at": null,  
                    "photo\_3\_at": null,  
                    "photo\_4\_at": null,  
                    "photo\_5\_at": null,  
                    "photo\_6\_at": null,  
                    "photo\_7\_at": null,  
                    "photo\_8\_at": null,  
                    "photo\_9\_at": null,  
                    "photo\_10\_at": null,  
                    "signature\_file\_url": null,  
                    "photo\_1\_file\_url": null,  
                    "photo\_2\_file\_url": null,  
                    "photo\_3\_file\_url": null,  
                    "photo\_4\_file\_url": null,  
                    "photo\_5\_file\_url": null,  
                    "photo\_6\_file\_url": null,  
                    "photo\_7\_file\_url": null,  
                    "photo\_8\_file\_url": null,  
                    "photo\_9\_file\_url": null,  
                    "photo\_10\_file\_url": null,  
                    "actual\_weight": null,  
                    "temperature": null,  
                    "hold\_time": null,  
                    "payment\_collected": null,  
                    "auto\_reschedule": null,  
                    "actual\_crates": null,  
                    "actual\_pallets": null,  
                    "actual\_utilization": null,  
                    "goods\_service\_rating": null,  
                    "driver\_rating": null,  
                    "customer\_feedback": null,  
                    "eta\_time": null,  
                    "live\_eta": null,  
                    "depot": null,  
                    "depot\_contact": null,  
                    "department": null,  
                    "sales\_person": null,  
                    "identification\_number": null,  
                    "bank\_prefix": null,  
                    "run\_number": null,  
                    "pick\_up\_from": null,  
                    "pick\_up\_time": null,  
                    "pick\_up\_lat": null,  
                    "pick\_up\_lng": null,  
                    "pick\_up\_address": null,  
                    "pick\_up\_address\_1": null,  
                    "pick\_up\_address\_2": null,  
                    "pick\_up\_address\_3": null,  
                    "pick\_up\_city": null,  
                    "pick\_up\_state": null,  
                    "pick\_up\_country": null,  
                    "pick\_up\_postal\_code": null,  
                    "pick\_up\_zone": null,  
                    "pick\_up\_assign\_to": null,  
                    "pick\_up\_reason": null,  
                    "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                    "pick\_up\_at": null,  
                    "scheduled\_at": null,  
                    "at\_warehouse\_at": null,  
                    "out\_for\_delivery\_at": null,  
                    "head\_to\_pick\_up\_at": null,  
                    "head\_to\_delivery\_at": null,  
                    "cancelled\_at": null,  
                    "pod\_at": null,  
                    "pick\_up\_failed\_count": null,  
                    "deliver\_failed\_count": null,  
                    "job\_price": null,  
                    "insurance\_price": null,  
                    "insurance\_coverage": false,  
                    "total\_price": null,  
                    "payer\_type": null,  
                    "remarks": null,  
                    "items\_count": 2,  
                    "service\_type": null,  
                    "warehouse\_address": null,  
                    "destination\_time\_window": null,  
                    "door": null,  
                    "time\_zone": null,  
                    "vehicle\_type": null,  
                    "created\_at": "2018-06-14T06:04:06.017Z",  
                    "items": \[{  
                        "id": "5b22055510c92b1a046ece05",  
                        "sku": "12345678",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 10,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }, {  
                        "id": "5b22055510c92b1a046ece06",  
                        "sku": "12387654",  
                        "purchase\_order\_number": null,  
                        "batch\_number": null,  
                        "expiry\_date": null,  
                        "description": null,  
                        "comments": null,  
                        "quantity": 5,  
                        "unit\_of\_measure": null,  
                        "checked": false,  
                        "actual\_quantity": null,  
                        "inbound\_quantity": null,  
                        "unload\_time\_estimate": null,  
                        "unload\_time\_actual": null,  
                        "follow\_up\_quantity": null,  
                        "follow\_up\_reason": null,  
                        "rework\_quantity": null,  
                        "rework\_reason": null,  
                        "reject\_quantity": 0,  
                        "reject\_reason": null,  
                        "weight": null,  
                        "serial\_numbers": \[\],  
                        "photo\_url": null  
                    }\],  
                    "milestones": \[{  
                        "status": "info\_recv",  
                        "assign\_to": null,  
                        "reason": null,  
                        "pod\_at": "2018-06-14T06:04:06.017Z",  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "user\_name": "Simon"  
                    }\]  
                }  
            }

\#\# Export by DO \[/dn/jobs/export/{do\_number}{?format}{?document}{?type}\]

\#\#\# Download Exported File \[GET\]

\+ Parameters

    \+ format: \`pdf\` (string) \- Format of export. Must be \`pdf\` or \`tiff\`

    \+ document: \`pod\` (string, optional) \- Document to be exported. Must be \`pod\` or \`shipping-label\`.  
        \+ default: \`pod\`

    \+ type: \`Delivery\` (string, optional) \- Type to be exported. Must be \`Delivery\` or \`Collection\`

\+ Request (application/json)

\+ Response 200 (application/octet-stream)

    \+ Headers

            Content-Disposition: attachment; filename="{filename}"

    \+ Body

            File content

\#\# Export by DO and Date \[/dn/jobs/export/{do\_number}/{date}{?format}{?document}{?type}\]

\#\#\# Download Exported File \[GET\]

\+ Parameters

    \+ format: \`pdf\` (string) \- Format of export. Must be \`pdf\` or \`tiff\`

    \+ document: \`pod\` (string, optional) \- Document to be exported. Must be \`pod\` or \`shipping-label\`.  
        \+ default: \`pod\`

    \+ type: \`Delivery\` (string, optional) \- Type to be exported. Must be \`Delivery\` or \`Collection\`

\+ Request (application/json)

\+ Response 200 (application/octet-stream)

    \+ Headers

            Content-Disposition: attachment; filename="{filename}"

    \+ Body

            File content

\#\# Search \[/dn/jobs/search\]

\+ \`account\_number\` (string) Account number.  
\+ \`address\` (string) Address.  
\+ \`deliver\_to\_collect\_from\` (string) Contact name.  
\+ \`customer\` (string) Customer.  
\+ \`dates\` (object) Date range in the form { from: '2018-07-01', to: '2018-07-31' }.  
\+ \`department\` (string) Department.  
\+ \`do\_number\` (string) DO number.  
\+ \`do\_numbers\` (array\[string\]) Array of DO numbers.  
\+ \`groups\` (array\[Group\]) An array of groups. E.g \[ { name: 'Detrack' } \].  
\+ \`invoice\_number\` (string) Invoice number.  
\+ \`item\_batch\_number\` (string) Item batch number.  
\+ \`item\_description\` (string) Item description.  
\+ \`item\_purchase\_order\_number\` (string) Item purchase order number.  
\+ \`item\_reasons\` (array\[string\]) An array of item reasons.  
\+ \`item\_serial\_numbers\` (string) Item serial number.  
\+ \`job\_time\` (string) Delivery time / collection time.  
\+ \`job\_type\` (string) Job type.  
\+ \`open\_to\_marketplace\` (boolean) Open job.  
\+ \`order\_number\` (string) Order number.  
\+ \`reasons\` (array\[string) Reasons. E.g \['No Recipient'\]  
\+ \`run\_number\` (string) Run number.  
\+ \`serial\_number\` (string) Serial number.  
\+ \`source\` (string) Source.  
\+ \`start\_dates\` (object) Start date range in the form { from: '2018-07-01', to: '2018-07-31' }  
\+ \`statuses\` (array\[string\]) Array of statues.  
\+ \`time\_window\` (string) Time slot.  
\+ \`tracking\_number\` (string) Tracking number.  
\+ \`type\` (string) Type. Must be \`Delivery\` / \`Collection\` or \`null\`.  
\+ \`vehicles\` (array\[Vehicle\]) Array of vehicles. E.g \[ { name: 'Sam' } \].  
\+ \`zone\` (string) Zone.  
\+ \`page\` (string) Page of search results.  
\+ \`limit\` (string) Number of records per page. Maximum 100\.

\#\#\# Search \[POST\]

\+ Request (application/json)

    \+ Headers

            X-API-KEY: {API\_KEY}

    \+ Body

            {  
                "data": {  
                    "type": "Delivery",  
                    "do\_number": "DO123456",  
                    "dates": {  
                        "from": "2018-07-01",  
                        "to": "2018-07-31"  
                    },  
                    "groups": \[  
                        {  
                            "name": "Detrack"  
                        }  
                    \]  
                }  
            }

\+ Response 200 (application/json)

    \+ Body

            {  
                "data": \[  
                    {  
                        "id": "5b22055510c92b1a046ece04",  
                        "type": "Delivery",  
                        "primary\_job\_status": "dispatched",  
                        "open\_to\_marketplace": false,  
                        "marketplace\_offer": null,  
                        "do\_number": "DO 0",  
                        "attempt": 1,  
                        "date": "2018-06-14",  
                        "start\_date": "2018-06-14",  
                        "job\_age": 1,  
                        "job\_release\_time": null,  
                        "job\_time": null,  
                        "time\_window": null,  
                        "job\_received\_date": null,  
                        "tracking\_number": "T0",  
                        "order\_number": "ORN12345678",  
                        "job\_type": null,  
                        "job\_sequence": null,  
                        "job\_fee": null,  
                        "address\_lat": null,  
                        "address\_lng": null,  
                        "address": "Singapore 470140",  
                        "company\_name": null,  
                        "address\_1": null,  
                        "address\_2": null,  
                        "address\_3": null,  
                        "postal\_code": "470140",  
                        "city": null,  
                        "state": null,  
                        "country": null,  
                        "geocoded\_lat": 1.33668219002454,  
                        "geocoded\_lng": 103.910711702473,  
                        "billing\_address": null,  
                        "deliver\_to\_collect\_from": "James Li",  
                        "last\_name": null,  
                        "phone\_number": "65432178",  
                        "sender\_phone\_number": null,  
                        "fax\_number": "65432179",  
                        "instructions": null,  
                        "assign\_to": null,  
                        "notify\_email": "test@example.com",  
                        "webhook\_url": null,  
                        "zone": null,  
                        "customer": null,  
                        "account\_number": null,  
                        "job\_owner": null,  
                        "invoice\_number": null,  
                        "invoice\_amount": null,  
                        "payment\_mode": null,  
                        "payment\_amount": null,  
                        "group\_name": null,  
                        "vendor\_name": null,  
                        "shipper\_name": null,  
                        "source": null,  
                        "weight": null,  
                        "parcel\_width": null,  
                        "parcel\_length": null,  
                        "parcel\_height": null,  
                        "cubic\_meter": null,  
                        "boxes": null,  
                        "cartons": null,  
                        "pieces": null,  
                        "envelopes": null,  
                        "pallets": null,  
                        "bins": null,  
                        "trays": null,  
                        "bundles": null,  
                        "rolls": null,  
                        "number\_of\_shipping\_labels": null,  
                        "attachment\_url": null,  
                        "detrack\_number": "DET2000001",  
                        "status": "dispatched",  
                        "tracking\_status": "Info received",  
                        "reason": null,  
                        "last\_reason": null,  
                        "received\_by\_sent\_by": null,  
                        "note": null,  
                        "carrier": null,  
                        "pod\_lat": "",  
                        "pod\_lng": "",  
                        "pod\_address": "",  
                        "address\_tracked\_at": null,  
                        "arrived\_lat": null,  
                        "arrived\_lng": null,  
                        "arrived\_address": null,  
                        "arrived\_at": null,  
                        "texted\_at": null,  
                        "called\_at": null,  
                        "serial\_number": null,  
                        "signed\_at": null,  
                        "photo\_1\_at": null,  
                        "photo\_2\_at": null,  
                        "photo\_3\_at": null,  
                        "photo\_4\_at": null,  
                        "photo\_5\_at": null,  
                        "signature\_file\_url": null,  
                        "photo\_1\_file\_url": null,  
                        "photo\_2\_file\_url": null,  
                        "photo\_3\_file\_url": null,  
                        "photo\_4\_file\_url": null,  
                        "photo\_5\_file\_url": null,  
                        "actual\_weight": null,  
                        "temperature": null,  
                        "hold\_time": null,  
                        "payment\_collected": null,  
                        "auto\_reschedule": null,  
                        "actual\_crates": null,  
                        "actual\_pallets": null,  
                        "actual\_utilization": null,  
                        "goods\_service\_rating": null,  
                        "driver\_rating": null,  
                        "customer\_feedback": null,  
                        "eta\_time": null,  
                        "live\_eta": null,  
                        "depot": null,  
                        "depot\_contact": null,  
                        "department": null,  
                        "sales\_person": null,  
                        "identification\_number": null,  
                        "bank\_prefix": null,  
                        "run\_number": null,  
                        "pick\_up\_from": null,  
                        "pick\_up\_time": null,  
                        "pick\_up\_lat": null,  
                        "pick\_up\_lng": null,  
                        "pick\_up\_address": null,  
                        "pick\_up\_address\_1": null,  
                        "pick\_up\_address\_2": null,  
                        "pick\_up\_address\_3": null,  
                        "pick\_up\_city": null,  
                        "pick\_up\_state": null,  
                        "pick\_up\_country": null,  
                        "pick\_up\_postal\_code": null,  
                        "pick\_up\_zone": null,  
                        "pick\_up\_assign\_to": null,  
                        "pick\_up\_reason": null,  
                        "info\_received\_at": "2018-06-14T06:04:06.017Z",  
                        "pick\_up\_at": null,  
                        "scheduled\_at": null,  
                        "at\_warehouse\_at": null,  
                        "out\_for\_delivery\_at": null,  
                        "head\_to\_pick\_up\_at": null,  
                        "head\_to\_delivery\_at": null,  
                        "cancelled\_at": null,  
                        "pod\_at": null,  
                        "pick\_up\_failed\_count": null,  
                        "deliver\_failed\_count": null,  
                        "job\_price": null,  
                        "insurance\_price": null,  
                        "insurance\_coverage": false,  
                        "total\_price": null,  
                        "payer\_type": null,  
                        "remarks": null,  
                        "items\_count": 2,  
                        "service\_type": null,  
                        "warehouse\_address": null,  
                        "destination\_time\_window": null,  
                        "door": null,  
                        "time\_zone": null,  
                        "vehicle\_type": null,  
                        "created\_at": "2018-06-14T06:04:06.017Z",  
                        "items": \[{  
                            "id": "5b22055510c92b1a046ece05",  
                            "sku": "12345678",  
                            "purchase\_order\_number": null,  
                            "batch\_number": null,  
                            "expiry\_date": null,  
                            "description": null,  
                            "comments": null,  
                            "quantity": 10,  
                            "unit\_of\_measure": null,  
                            "checked": false,  
                            "actual\_quantity": null,  
                            "inbound\_quantity": null,  
                            "unload\_time\_estimate": null,  
                            "unload\_time\_actual": null,  
                            "follow\_up\_quantity": null,  
                            "follow\_up\_reason": null,  
                            "rework\_quantity": null,  
                            "rework\_reason": null,  
                            "reject\_quantity": 0,  
                            "reject\_reason": null,  
                            "weight": null,  
                            "serial\_numbers": \[\],  
                            "photo\_url": null  
                        }, {  
                            "id": "5b22055510c92b1a046ece06",  
                            "sku": "12387654",  
                            "purchase\_order\_number": null,  
                            "batch\_number": null,  
                            "expiry\_date": null,  
                            "description": null,  
                            "comments": null,  
                            "quantity": 5,  
                            "unit\_of\_measure": null,  
                            "checked": false,  
                            "actual\_quantity": null,  
                            "inbound\_quantity": null,  
                            "unload\_time\_estimate": null,  
                            "unload\_time\_actual": null,  
                            "follow\_up\_quantity": null,  
                            "follow\_up\_reason": null,  
                            "rework\_quantity": null,  
                            "rework\_reason": null,  
                            "reject\_quantity": 0,  
                            "reject\_reason": null,  
                            "weight": null,  
                            "serial\_numbers": \[\],  
                            "photo\_url": null  
                        }\],  
                        "milestones": \[{  
                            "status": "info\_recv",  
                            "assign\_to": null,  
                            "reason": null,  
                            "pod\_at": "2018-06-14T06:04:06.017Z",  
                            "created\_at": "2018-06-14T06:04:06.017Z",  
                            "user\_name": "Simon"  
                        }\]  
                    }  
                \],  
                "links": {  
                    "next": "https://app.detrack.com/api/v2/dn/jobs/search/1",  
                    "prev": null  
                }  
            }

