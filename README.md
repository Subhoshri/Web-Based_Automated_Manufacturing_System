# Web-Based Automated Manufacturing System (WAMS)
## Purpose
WAMS is designed to help companies manage their manufacturing of products based on orders and sending them to dealers in time.
This document is intended to:
- Serve as guidelines for developers to understand system requirements clearly and develop the software.
- Serve as a software validation document for stakeholders and prospective clients to verify the system functionalities.

## Scope
WAMS is a web-based application designed to automate and manage end-to-end manufacturing operations for companies that manufacture products based on dealer orders. This section describes the features that are in scope and out of scope of the software.

In Scope:
a. Dealer order management
b. Product and raw material inventory management
c. Supplier and quotation management
d. Manufacturing decision support
e. Billing and payment management
f. Stock updates and reporting

Out of Scope:
a. Online payment gateway integration
b. Logistics and shipment tracking
c. Human resource and payroll management
d. Predictive AI beyond basic decision support

## User characteristics
The intended users of WAMS include:
- Dealers: Basic computer literacy, minimal training required
- Inventory Managers: Knowledge of inventory and manufacturing processes
- Sales Managers: Familiarity with billing and order management
- Procurement Managers: Experience with supplier negotiations and quotations
- System Administrators: Technical expertise in system configuration and maintenance

## Principal Actors
The principal actors interacting with WAMS include the Admin, Dealer, Supplier,
Inventory Manager, Sales Manager, Procurement Manager, and the System itself.
All actors except the System are denoted as User.
- The Admin is responsible for overall system administration, including user management and configuration.
- Dealers interact with the system to place product orders, view order status, and access billing information.
- Suppliers use the system to submit quotations and fulfill raw material orders placed by the company.
- Inventory Managers monitor and update product and raw material stock levels, especially after production and transactions.
- Sales Managers handle dealer orders, generate bills, and produce sales reports.
- Procurement Managers are responsible for requesting, evaluating, and finalizing supplier quotations and raw material orders.
- The System acts as an automated actor that performs background operations such as stock updates, report generation, notifications, and decision-support functions without direct user intervention.