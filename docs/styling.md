# Styling and Design Approach for the UKHSA Data Dashboard

The **UKHSA Data Dashboard** adopts the **GDS (Government Digital Service) Design System** as its core styling framework, ensuring alignment with government accessibility and usability standards. By directly consuming the GDS Design System, we maintain consistency with other UK government services without the need for an internal design system.

## Key Aspects of Our Styling Approach

1. **Primary Use of the GDS Design System**  
   We integrate the **GDS Design System** CSS library directly, utilising its comprehensive suite of accessible UI components and styles. This approach provides a unified and recognisable user experience across UKHSA's dashboard, aligning with the broader UK government digital ecosystem.

2. **Combining GDS and Tailwind CSS for Custom Styling**  
   For customisation beyond the capabilities of the GDS system, we incorporate **Tailwind CSS**. Tailwind's utility-first classes enable us to add bespoke styling while preserving consistency with GDS standards. Tailwind is particularly useful for fine-tuning components that require more flexibility than GDS alone can provide.

3. **Responsive Design with GDS and Tailwind**

   - **GDS Grid**: Wherever feasible, we use the **GDS grid system** for out-of-the-box responsive design. This ensures that most layout adjustments for different screen sizes are handled seamlessly by GDS’s responsive utilities.
   - **Tailwind Responsive Helpers**: In some cases, where more granular control over responsiveness is needed, we employ Tailwind’s responsive helper classes. This combination enables a fully responsive design that adjusts optimally for various devices and screen sizes, maintaining a cohesive layout across the application.

4. **Styling Conventions for Consistency**
   - **Spacing and Typography**: We prioritise GDS’s spacing and typography classes, such as `govuk-!-margin-{x}`, over Tailwind's `m-` or `p-` utilities, to ensure design consistency with GDS standards.
   - **Component-Specific Adjustments**: When components require additional styling, we carefully balance GDS classes with Tailwind utilities. GDS remains the foundation, with Tailwind used for targeted customisation.

## Summary

Our styling strategy merges the **GDS Design System** with **Tailwind CSS** to create a robust, responsive, and accessible UI. Relying on GDS for foundational styling and layout, and using Tailwind for customisation, enables us to offer a user-friendly and visually consistent dashboard that adheres to UK government standards.
