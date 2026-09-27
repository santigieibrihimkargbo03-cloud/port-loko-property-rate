// =========================================================
// PORT LOKO CITY COUNCIL
// PROPERTY RATE MANAGEMENT SYSTEM
// GOOGLE SHEETS FORM SUBMISSION
// =========================================================

// =========================================================
// GOOGLE APPS SCRIPT WEB APP URL
// =========================================================

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxtthYOHG2afkZZR3N-1G8O7I80KyFGInuvbKOwhfv1pHm_S0uWoy03kogRTiUQHznx/exec";


// =========================================================
// FORM
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("propertyRateForm");

    if (!form) {
        console.error("Property rate form was not found.");
        return;
    }


    form.addEventListener("submit", async function (event) {

        event.preventDefault();


        // =====================================================
        // GET FORM VALUES
        // =====================================================

        const propertyCode =
            document.getElementById("propertyCode").value.trim();

        const propertyOwner =
            document.getElementById("propertyOwner").value.trim();

        const propertyType =
            document.getElementById("propertyType").value;

        const propertyAddress =
            document.getElementById("propertyAddress").value.trim();

        const propertyCaretaker =
            document.getElementById("tenantCaretaker").value.trim();

        const receivedBy =
            document.getElementById("receivedBy").value.trim();

        const dateReceived =
            document.getElementById("dateReceived").value;

        const amount =
            document.getElementById("amount").value;

        const section =
            document.getElementById("section").value;


        // =====================================================
        // CHECK REQUIRED FIELDS
        // =====================================================

        if (
            !propertyCode ||
            !propertyOwner ||
            !propertyType ||
            !propertyAddress ||
            !receivedBy ||
            !dateReceived ||
            !amount ||
            !section
        ) {

            alert(
                "Please complete all required fields before submitting the form."
            );

            return;
        }


        // =====================================================
        // CHECK AMOUNT
        // =====================================================

        if (Number(amount) < 0) {

            alert("Please enter a valid amount.");

            return;
        }


        // =====================================================
        // DISABLE SUBMIT BUTTON
        // =====================================================

        const submitButton =
            form.querySelector('button[type="submit"]');

        submitButton.disabled = true;
        submitButton.textContent = "SUBMITTING...";


        try {

            // =================================================
            // PREPARE DATA
            // =================================================

            const data = {

                propertyCode: propertyCode,

                propertyOwner: propertyOwner,

                propertyType: propertyType,

                propertyAddress: propertyAddress,

                propertyCaretaker: propertyCaretaker,

                receivedBy: receivedBy,

                dateReceived: dateReceived,

                amount: Number(amount),

                section: section

            };


            // =================================================
            // SEND DATA TO GOOGLE SHEETS
            // =================================================

            await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: "POST",

                    mode: "no-cors",

                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },

                    body: JSON.stringify(data)
                }
            );


            // =================================================
            // SUCCESS MESSAGE
            // =================================================

            alert(
                "Property rate information has been submitted successfully."
            );


            // Clear the form
            form.reset();


        } catch (error) {

            console.error(
                "Submission error:",
                error
            );

            alert(
                "The information could not be submitted.\n\n" +
                "Please check your internet connection and try again."
            );

        } finally {

            // =================================================
            // ENABLE BUTTON AGAIN
            // =================================================

            submitButton.disabled = false;
            submitButton.textContent = "SUBMIT FORM";

        }

    });

});