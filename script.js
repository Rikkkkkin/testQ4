document.addEventListener('DOMContentLoaded', function() {
  const totalQuestions = 20;
  let currentPreQ = '';

  // Function to update the progress bar
  function updateProgressBar() {
    let answeredCount = 0;

    for (let i = 1; i <= totalQuestions; i++) {
      const questionName = `q${i}`;
      const answer = document.querySelector(`input[name="${questionName}"]:checked`);
      if (answer) {
        answeredCount++;
      }
    }

    const progressPercent = ((answeredCount / totalQuestions) * 100).toFixed(0);
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${progressPercent}%`;
    progressBar.setAttribute('data-percentage', progressPercent);
  }

  // Add event listeners to all radio buttons
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach((radio) => {
    radio.addEventListener('change', function() {
      updateProgressBar();
      updatePreQ(this);
      // Remove highlight if the question is answered
      const questionDiv = this.closest('.question');
      if (questionDiv.classList.contains('unanswered')) {
        questionDiv.classList.remove('unanswered');
      }
    });
  });

  // Function to update the preQ text based on the current question
  function updatePreQ(currentInput) {
    const questionDiv = currentInput.closest('.question');
    const preQText = questionDiv.getAttribute('data-preq');

    if (preQText && preQText !== currentPreQ) {
      currentPreQ = preQText;
      document.getElementById('preq-text').innerText = preQText;
    }
  }

  // Initialize progress bar on page load
  updateProgressBar();

  // Initialize preQ text with the first question's preQ
  const firstQuestion = document.querySelector('.question');
  if (firstQuestion) {
    const preQText = firstQuestion.getAttribute('data-preq');
    if (preQText) {
      currentPreQ = preQText;
      document.getElementById('preq-text').innerText = preQText;
    }
  }

  // Form submission handling
  document.getElementById('questionnaire').addEventListener('submit', function(event) {
    event.preventDefault();

    const userAnswers = {};
    let allAnswered = true;

    // Remove previous highlights
    const questionDivs = document.querySelectorAll('.question');
    questionDivs.forEach(question => {
      question.classList.remove('unanswered');
    });

    // Check for unanswered questions and highlight them
    for (let i = 1; i <= totalQuestions; i++) {
      const questionName = `q${i}`;
      const answer = document.querySelector(`input[name="${questionName}"]:checked`);
      if (answer) {
        userAnswers[questionName] = answer.value;
      } else {
        allAnswered = false;
        // Highlight the unanswered question
        const questionDiv = document.getElementById(`question-${i}`);
        if (questionDiv) {
          questionDiv.classList.add('unanswered');
        }
      }
    }

    if (!allAnswered) {
      alert('未回答の質問があります。赤枠の質問にお答えください。');
      // Scroll to the first unanswered question
      const firstUnanswered = document.querySelector('.unanswered');
      if (firstUnanswered) {
        firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Since no scoring is defined, we'll just display a completion message
    document.getElementById('result').innerText = `アンケートへのご協力ありがとうございます。`;
  });
});
