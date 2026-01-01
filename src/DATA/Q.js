const quizBank = {
  c: {
    title: 'C Programming',
    questions: [
      {
        question: 'Which header file is required to use printf in C?',
        options: [
          { text: '<stdio.h>', isCorrect: true },
          { text: '<stdlib.h>', isCorrect: false },
          { text: '<string.h>', isCorrect: false },
          { text: '<math.h>', isCorrect: false }
        ],
        explanation: 'printf is declared in stdio.h, which provides standard input/output functions.'
      },
      {
        question: 'What should main return in a well-formed C program?',
        options: [
          { text: 'An int status code', isCorrect: true },
          { text: 'A void type', isCorrect: false },
          { text: 'A char pointer', isCorrect: false },
          { text: 'Nothing; return is optional', isCorrect: false }
        ],
        explanation: 'main conventionally returns an int to the operating system; 0 indicates success.'
      },
      {
        question: 'Which loop is best when the number of iterations is known?',
        options: [
          { text: 'for loop', isCorrect: true },
          { text: 'while loop', isCorrect: false },
          { text: 'do-while loop', isCorrect: false },
          { text: 'goto loop', isCorrect: false }
        ],
        explanation: 'for loops pair initialization, condition, and increment in one place, ideal for fixed counts.'
      },
      {
        question: 'What does the * symbol mean in a declaration like int *ptr;?',
        options: [
          { text: 'ptr is a pointer to int', isCorrect: true },
          { text: 'ptr is multiplied by int', isCorrect: false },
          { text: 'ptr is an array of int', isCorrect: false },
          { text: 'ptr is a function', isCorrect: false }
        ],
        explanation: 'The asterisk in a declaration indicates the variable is a pointer to the specified type.'
      },
      {
        question: 'Which function safely reads a line of text into a buffer?',
        options: [
          { text: 'fgets', isCorrect: true },
          { text: 'gets', isCorrect: false },
          { text: 'scanf("%s")', isCorrect: false },
          { text: 'printf', isCorrect: false }
        ],
        explanation: 'fgets takes a buffer size, preventing overflow; gets and bare %s do not bound input.'
      },
      {
        question: 'What is the correct format specifier for printing a long long int?',
        options: [
          { text: '%lld', isCorrect: true },
          { text: '%ld', isCorrect: false },
          { text: '%d', isCorrect: false },
          { text: '%llu', isCorrect: false }
        ],
        explanation: '%lld is the standard printf specifier for signed long long values.'
      }
    ]
  },
  python: {
    title: 'Python',
    questions: [
      {
        question: 'Which keyword is used to define a function in Python?',
        options: [
          { text: 'def', isCorrect: true },
          { text: 'func', isCorrect: false },
          { text: 'lambda', isCorrect: false },
          { text: 'function', isCorrect: false }
        ],
        explanation: 'Python uses def to introduce a named function block.'
      },
      {
        question: 'Lists in Python are:',
        options: [
          { text: 'Mutable sequences', isCorrect: true },
          { text: 'Immutable sequences', isCorrect: false },
          { text: 'Fixed-length arrays', isCorrect: false },
          { text: 'Unordered sets', isCorrect: false }
        ],
        explanation: 'Lists are ordered, mutable containers that can grow or shrink.'
      },
      {
        question: 'What does len("hello") return?',
        options: [
          { text: '5', isCorrect: true },
          { text: '4', isCorrect: false },
          { text: '6', isCorrect: false },
          { text: 'Raises an error', isCorrect: false }
        ],
        explanation: 'len counts characters in the string, so "hello" has length 5.'
      },
      {
        question: 'Why use a virtual environment (venv)?',
        options: [
          { text: 'To isolate project dependencies', isCorrect: true },
          { text: 'To speed up the CPU', isCorrect: false },
          { text: 'To compile Python to C', isCorrect: false },
          { text: 'To disable pip', isCorrect: false }
        ],
        explanation: 'venv keeps per-project packages separate from the system interpreter.'
      },
      {
        question: 'Which command installs a package from PyPI?',
        options: [
          { text: 'pip install package', isCorrect: true },
          { text: 'python install package', isCorrect: false },
          { text: 'pip get package', isCorrect: false },
          { text: 'py add package', isCorrect: false }
        ],
        explanation: 'pip install <name> is the standard way to fetch packages from PyPI.'
      },
      {
        question: 'What is the purpose of if __name__ == "__main__": ?',
        options: [
          { text: 'Run code only when the file is executed directly', isCorrect: true },
          { text: 'Declare a global variable', isCorrect: false },
          { text: 'Import all modules', isCorrect: false },
          { text: 'Create a class', isCorrect: false }
        ],
        explanation: 'The guard lets a module expose functions while running certain code only when launched as a script.'
      }
    ]
  },
  javascript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What does === do in JavaScript?',
        options: [
          { text: 'Compares value and type', isCorrect: true },
          { text: 'Assigns a value', isCorrect: false },
          { text: 'Performs bitwise AND', isCorrect: false },
          { text: 'Compares only value', isCorrect: false }
        ],
        explanation: '=== is the strict equality operator; it requires both value and type to match.'
      },
      {
        question: 'Which method adds an item to the end of an array?',
        options: [
          { text: 'push', isCorrect: true },
          { text: 'pop', isCorrect: false },
          { text: 'shift', isCorrect: false },
          { text: 'unshift', isCorrect: false }
        ],
        explanation: 'push appends to the array tail; pop removes from the tail.'
      },
      {
        question: 'What does const guarantee?',
        options: [
          { text: 'The binding cannot be reassigned', isCorrect: true },
          { text: 'The value is deeply immutable', isCorrect: false },
          { text: 'The variable is function-scoped', isCorrect: false },
          { text: 'The value is hoisted', isCorrect: false }
        ],
        explanation: 'const prevents rebinding, but referenced objects can still be mutated.'
      },
      {
        question: 'Which DOM API selects the first element matching a CSS selector?',
        options: [
          { text: 'document.querySelector', isCorrect: true },
          { text: 'document.getElementById', isCorrect: false },
          { text: 'document.getElementsByClassName', isCorrect: false },
          { text: 'document.querySelectorAll returns the first', isCorrect: false }
        ],
        explanation: 'querySelector returns the first matching element; querySelectorAll returns a NodeList of all matches.'
      },
      {
        question: 'What is a Promise used for?',
        options: [
          { text: 'Represent async completion or failure', isCorrect: true },
          { text: 'Store DOM nodes only', isCorrect: false },
          { text: 'Format JSON strings', isCorrect: false },
          { text: 'Schedule synchronous loops', isCorrect: false }
        ],
        explanation: 'A Promise is a placeholder for a future result of an asynchronous operation.'
      },
      {
        question: 'What value represents “Not a Number” in JavaScript?',
        options: [
          { text: 'NaN', isCorrect: true },
          { text: 'undefined', isCorrect: false },
          { text: 'null', isCorrect: false },
          { text: 'Infinity', isCorrect: false }
        ],
        explanation: 'NaN indicates an invalid numeric result, such as 0/0.'
      }
    ]
  }
};

export default quizBank;
