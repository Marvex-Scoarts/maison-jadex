    const resForm = document.querySelector('.reservation-form');
    const mjBackdrop = document.getElementById('mjBackdrop');
    const mjModal = document.getElementById('mjConfirmModal');
    const mjDetails = document.getElementById('mjBookingDetails');
    const mjGreeting = document.getElementById('mjGuestGreeting');
    const mjCloseBtn = document.getElementById('mjCloseModalBtn');

    function closeReservationModal() {
      mjModal.classList.remove('open');
      mjBackdrop.classList.remove('open');
    }

    mjCloseBtn.addEventListener('click', closeReservationModal);
    mjBackdrop.addEventListener('click', closeReservationModal);

    if (resForm) {
      resForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = resForm.querySelectorAll('input');
        const guestName = inputs[0].value.trim();
        const rawDate = inputs[1].value;
        const rawTime = inputs[2].value;
        const notes = inputs[3].value.trim() || 'None';
        const partySize = resForm.querySelector('select').value;

        // Format Date Nicely
        const formattedDate = new Date(rawDate + 'T00:00:00').toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        });

        // Format 24h Time into 12h AM/PM
        const [hourStr, minute] = rawTime.split(':');
        let hour = parseInt(hourStr, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        const formattedTime = `${hour}:${minute} ${ampm}`;

        mjGreeting.textContent = `Merci, ${guestName}!`;
        mjDetails.innerHTML = `
          <div><strong>Guest:</strong> ${guestName}</div>
          <div><strong>Date:</strong> ${formattedDate}</div>
          <div><strong>Time:</strong> ${formattedTime}</div>
          <div><strong>Party:</strong> ${partySize}</div>
          <div><strong>Notes:</strong> ${notes}</div>
        `;

        mjBackdrop.classList.add('open');
        mjModal.classList.add('open');
        resForm.reset();
      });
    }
