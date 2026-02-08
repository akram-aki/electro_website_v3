# Admin Dashboard Restructuring Plan

This plan involves modifying the `AdminPage` to simplify the dashboard by removing the current tabs (Registrations, Applications, Projects, Events) and replacing them with "Add New Form" and "Active Forms".

## 1. Update AdminPage Component

- **File**: [`src/pages/AdminPage.jsx`](src/pages/AdminPage.jsx)
- **Action**:
    - Remove the existing tabs: "Club Registrations", "Applications", "Projects", "Events".
    - Add two new tabs: "Add New Form" and "Active Forms".
    - Update `renderContent` to switch between these two new views.
    - Update state `activeTab` initial value and options.

## 2. Implement "Add New Form" View

- **File**: [`src/pages/AdminPage.jsx`](src/pages/AdminPage.jsx) (or new component)
- **Action**:
    - Define what content goes into "Add New Form".
    - **Assumption**: This will likely be a form builder or a selection of existing "Add" components (like Projects/Events) repurposed, or a completely new form creation interface.
    - **Clarification Needed**: What exactly should be in "Add New Form"? Is it to create *new types* of forms (dynamic), or is it to add new *entries* (like adding a new Project/Event)?

## 3. Implement "Active Forms" View

- **File**: [`src/pages/AdminPage.jsx`](src/pages/AdminPage.jsx) (or new component)
- **Action**:
    - Define what content goes into "Active Forms".
    - **Assumption**: This will display the list of submitted data (Registrations, Applications) or the list of currently active forms that users can fill out.
    - **Clarification Needed**: Does "Active Forms" mean *viewing submissions* (like the old Registrations/Applications tabs) or *managing which forms are visible* to users?

## Questions for Clarification

To implement this correctly, I need to know:

1. **What is "Add New Form"?**

    - A) A place to add new *content* (like a new Project or Event).
    - B) A place to create a *new type* of form (like a form builder).

2. **What is "Active Forms"?**

    - A) A list of submissions received (Registrations, Applications).
    - B) A list of forms currently enabled on the site.








