const nav = document.querySelectorAll('span.navLink');
const main = document.querySelectorAll('div.innerMain>div');

let prevLink;

nav.forEach((link) => {
    link.addEventListener('click', () => {
        link.style.background = '#005d92';
        if (prevLink != link) {
            main[prevLink.id].style.display = 'none';
            main[link.id].style.display = 'block';

            prevLink.style.background = '#006fae';
            prevLink = link;
        }
    });
    link.addEventListener('mouseover', () => {
        link.style.background = '#05659c';
    });
    link.addEventListener('mouseout', () => {
        if (prevLink == link) {
            link.style.background = '#005d92';
        } else {
            link.style.background = 'transparent';
        }
    });
});

nav[0].style.background = '#005d92';
main[0].style.display = 'block';
prevLink = nav[0];

//make quiz
document.querySelector('div.makeQuiz').addEventListener('click', () => {
    nav[2].click();
});

// making a quiz
let quizTypes = document.querySelectorAll('div.quizTypes div.quizType');
let quizHolder = document.querySelector('div.learningMain');
let quizTypeArray = ['True or False', ' Multiple Choice', 'Join the Dots'];
let quizIndex = 0;
quizTypes.forEach((type) => {
    type.id = quizIndex;
    quizIndex++;
    type.addEventListener('click', () => {
        let quizMaker = document.createElement('div');
        quizMaker.className = 'quizMaker';

        let quizTopBar = document.createElement('div');
        quizTopBar.className = 'quizTopBar';
        let backIcon = document.createElement('i');
        backIcon.className = 'fa fa-arrow-circle-o-left';
        let topTitle = document.createElement('div');
        topTitle.className = 'topTitle';
        topTitle.innerHTML =
            '<input type="text" name="quizTitle" placeholder="Add Quiz Title"/>';

        let savePreview = document.createElement('div');
        savePreview.className = 'savePreview';
        savePreview.innerHTML =
            '<span class="preview" onClick="preview()"><i class="fa fa-eye" aria-hidden="true"></i>Preview</span><span class="save" onClick="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i>Save</span>';

        backIcon.addEventListener('click', () => {
            quizMaker.remove();
        });

        quizTopBar.appendChild(backIcon);
        quizTopBar.appendChild(topTitle);
        quizTopBar.appendChild(savePreview);
        quizMaker.appendChild(quizTopBar);

        let quizInfo = document.createElement('div');
        quizInfo.className = 'quizInfo';
        quizMaker.appendChild(quizInfo);

        quizHolder.appendChild(quizMaker);

        makeAQuiz(type.id, quizInfo);
    });
});

function makeAQuiz(type, target) {
    let i = 1;
    makeQuestion();

    function makeQuestion() {
        let question = document.createElement('div');
        question.className = 'question';

        let qNo = document.createElement('span');
        qNo.className = 'qNo';
        qNo.innerHTML = i + '.';
        question.appendChild(qNo);

        let qHo = document.createElement('div');
        qHo.className = 'qHo';

        let actualQ = document.createElement('div');
        actualQ.className = 'actualQ';
        actualQ.innerHTML =
            '<p class="q">Question</p><input class="qInput" type="text" placeholder="Question goes here..."/>';

        questionDetails(question, actualQ, qHo);

        i++;
    }

    function questionDetails(question, actualQ, qHo) {
        if (type == 0) {
            let answer = document.createElement('div');
            answer.className = 'trueValue';
            name = 'a' + i;
            trueID = 'isTrue' + i;
            falseID = 'isFalse' + i;
            answer.innerHTML =
                '<label for="' +
                trueID +
                '"><input type="radio" value="1" id="' +
                trueID +
                '" name="' +
                name +
                '"/><div class="radio"><i class="fa fa-check-circle" aria-hidden="true"></i>True</div></label>' +
                '<label for="' +
                falseID +
                '"><input type="radio" value="0" id="' +
                falseID +
                '" name="' +
                name +
                '"/><div class="radio"><i class="fa fa-times-circle" aria-hidden="true"></i>False</div></label>';

            actualQ.appendChild(answer);
            qHo.appendChild(actualQ);
            question.appendChild(qHo);

            target.appendChild(question);
            addQuestion();
            radioListeners(name);
        }
    }

    function addQuestion() {
        if (document.querySelector('div.addQuestion')) {
            document.querySelector('div.addQuestion').remove();
        }
        let addIcon = document.createElement('div');
        addIcon.className = 'addQuestion';
        addIcon.innerHTML =
            '<i class="fa fa-plus" aria-hidden="true"></i><span>Add a question</span>';

        addIcon.addEventListener('click', () => {
            makeQuestion();
        });
        target.appendChild(addIcon);
    }

    function radioListeners(radioBtnName) {
        let radioBtns = document.querySelectorAll(
            'input[name="' + radioBtnName + '"]'
        );
        radioBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                for (const i of radioBtns) {
                    if (i.checked) {
                        i.nextElementSibling.style.color = '#fff';
                        i.nextElementSibling.style.background = '#006fae';
                    } else {
                        i.nextElementSibling.style.color = '#006fae';
                        i.nextElementSibling.style.background = 'transparent';
                    }
                }
            });
        });
    }
}

function savePreviewFunc() {
    let quizTitle = document.querySelector('input[name="quizTitle"]');
    let inputs = document.querySelectorAll('input.qInput');
    let radioArr = [];
    for (let i = 1; i <= inputs.length; i++) {
        radioArr.push('a' + i);
    }

    let inputQuestions = [];
    let radioAnswers = [];

    let incorrectInput = false;

    let radioCounter = 1;
    inputs.forEach((input) => {
        if (input.value == '') {
            input.style.border = '1px solid #ec7161';
            incorrectInput = true;
        } else {
            inputQuestions.push(input.value);
            input.style.border = 'none';
            incorrectInput = false;
        }

        let ans = document.querySelector(
            'input[name="' + radioArr[radioCounter - 1] + '"]:checked'
        );
        if (ans != null) {
            radioAnswers.push(ans.value);
        }

        radioCounter++;
    });

    let returnQuizTitle = quizTitle.value;
    if (returnQuizTitle == '') {
        quizTitle.style.borderBottom = '2px solid #ec7161';
        incorrectInput = true;
    } else {
        quizTitle.style.borderBottom = '2px solid #ec7161';
        incorrectInput = false;
    }

    let isCorrect = false;
    if (!incorrectInput && radioAnswers.length == radioCounter - 1) {
        isCorrect = true;
    } else {
        isCorrect = false;
    }
    return { isCorrect, returnQuizTitle, inputQuestions, radioAnswers };
}

function preview() {
    let {
        isCorrect,
        returnQuizTitle,
        inputQuestions,
        radioAnswers,
    } = savePreviewFunc();

    if (!isCorrect) {
        alert('Not ready to preview');
    } else {
        let previewContainer = document.createElement('div');
        previewContainer.className = 'previewContainer';

        let innerPreviewContainer = document.createElement('div');
        innerPreviewContainer.className = 'innerPreviewContainer';

        let previewTopBar = document.createElement('div');
        previewTopBar.className = 'previewTopBar';

        let title = document.createElement('span');
        title.className = 'previewTitle';
        title.innerHTML = returnQuizTitle;

        let closeIcon = document.createElement('span');
        closeIcon.className = 'closeIcon';
        closeIcon.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';

        closeIcon.addEventListener('click', () => {
            previewContainer.remove();
        });
        previewTopBar.appendChild(title);
        previewTopBar.appendChild(closeIcon);
        innerPreviewContainer.appendChild(previewTopBar);

        for (let i = 0; i < inputQuestions.length; i++) {
            let prevQuestion = document.createElement('div');
            prevQuestion.className = 'prevQuestion';

            let question = document.createElement('p');
            question.className = 'question';
            question.innerHTML = i + 1 + '. ' + inputQuestions[i];
            prevQuestion.appendChild(question);

            let answers = document.createElement('div');
            answers.className = 'answers';
            let prevRadioName = 'a' + i;
            answers.innerHTML =
                '<label><input type="radio" name="' +
                prevRadioName +
                '" value="1">True</label><label><input type="radio" name="' +
                prevRadioName +
                '" value="0">False</label>';
            prevQuestion.appendChild(answers);

            innerPreviewContainer.appendChild(prevQuestion);
        }

        previewContainer.appendChild(innerPreviewContainer);
        document.querySelector('body').appendChild(previewContainer);
    }
}

function save() {
    let {
        isCorrect,
        returnQuizTitle,
        inputQuestions,
        radioAnswers,
    } = savePreviewFunc();

    if (isCorrect) {
        alert('saved');
    } else {
        alert('Not saved');
    }
}