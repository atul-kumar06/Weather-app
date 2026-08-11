// Ensure code runs after HTML is fully loaded
    window.addEventListener('DOMContentLoaded', () => {
      const customSelect = document.getElementById('daySelect');

      if (!customSelect) return;

      const trigger = customSelect.querySelector('.select-trigger');
      const options = customSelect.querySelectorAll('.option');
      const selectedValue = customSelect.querySelector('.selected-value');

      // Toggle dropdown open/close state
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = customSelect.classList.contains('open');
        customSelect.classList.toggle('open');
        trigger.setAttribute('aria-expanded', !isOpen);
      });

      // Handle selecting an option
      options.forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();

          options.forEach(opt => {
            opt.classList.remove('selected');
            opt.setAttribute('aria-selected', 'false');
          });

          option.classList.add('selected');
          option.setAttribute('aria-selected', 'true');
          selectedValue.textContent = option.textContent;

          customSelect.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        });
      });

      // Close dropdown when clicking anywhere outside
      document.addEventListener('click', () => {
        customSelect.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
