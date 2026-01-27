I will implement the requested changes to the Careers page, focusing on mobile responsiveness, job application flow, and layout fixes.

### **Plan of Action**

1. **Enhance Mobile Visuals (Color & Contrast)**

   * **Strategy**: Reduce reliance on `group-hover` for color visibility.

   * **Changes**:

     * In `CareersPage`, update the **Benefits Grid** and **Open Positions** to use persistent brand colors (orange) for icons and key labels, rather than fading them out until hover.

     * Increase base text opacity for better readability on small screens.

2. **Update Open Positions & Application Logic**

   * **Content Updates**:

     * Add a **"Marketing"** role (e.g., "Product Marketing Manager").

     * **Remove** all mentions of payments/salary from the listed roles.

   * **Interaction**:

     * Implement a "Select & Apply" flow: Clicking a position will scroll to the application form and **auto-select** that role in the dropdown.

     * I will achieve this by converting the `OpenRoles` list into a Client Component or using URL search params (e.g., `?role=marketing`) which the form will read.

   * **Form Data**: Ensure the form's position dropdown includes a comprehensive list of all system roles (Engineering, Sales, Marketing, etc.), not just the open ones.

3. **Layout Fixes (Equal Height Sidebar)**

   * **Desktop**: Modify the "Contact HR" sidebar card to stretch to the full height of the Application Form using Flexbox/Grid alignment (`h-full`). This will replace the current "sticky" behavior to satisfy the "equal height" requirement.

   * **Mobile**: Maintain the current stacked layout where the card takes its natural height.

4. **Fix React Warning**

   * **Target**: `src/components/careers/ApplicationForm.tsx`

   * **Fix**: Replace the incorrect `<option selected>` usage with the controlled `value` prop on the parent `<select>` element.

### **Verification**

* Verify the `select` warning is gone from the console.

* Confirm clicking a role pre-fills the dropdown.

* Check that the page looks vibrant on mobile without needing hover interactions.

* Verify the Sidebar and Form are the same height on large screens.

