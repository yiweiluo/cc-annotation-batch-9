var botcaptcha = {
  name: 'botcaptcha',
  "title": 'Are you a bot?',
  "buttonText": 'Let\'s go!',
  render: function () {
    var viewTemplate = $('#botcaptcha-view').html();

    // define possible speaker and listener names
    // fun fact: 10 most popular names for boys and girls
    var speaker = _.shuffle(['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles'])[0];
    var listener = _.shuffle(['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Margaret'])[0];

    var story = speaker + ' says to ' + listener + ': \'It\'s a beautiful day, isn\'t it?\''

    $('#main').html(
      Mustache.render(viewTemplate, {
        name: this.name,
        title: this.title,
        text: story,
        question: 'Who is ' + speaker + ' talking to?',
        button: this.buttonText
      })
    );

    // don't allow enter press in text field
    $('#listener-response').keypress(function (event) {
      if (event.keyCode === 13) {
        event.preventDefault()
      }
    });

    // don't show any error message
    $('#error').hide();
    $('#error_incorrect').hide();
    $('#error_2more').hide();
    $('#error_1more').hide();

    // amount of trials to enter correct response
    var trial = 0;

    $('#next').on('click', function () {
      var response = $('#listener-response').val().replace(' ', '');

      // response correct
      if (listener.toLowerCase() === response.toLowerCase()) {
        //exp.global_data.botresponse = $('#listener-response').val();
        //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
        exp.findNextView();

        // response false
      } else {
        trial = trial + 1;
        $('#error_incorrect').show();
        if (trial === 1) {
          $('#error_2more').show();
        } else if (trial === 2) {
          $('#error_2more').hide();
          $('#error_1more').show();
        } else {
          $('#error_incorrect').hide();
          $('#error_1more').hide();
          $('#next').hide();
          $('#quest-response').css('opacity', '0.2');
          $('#listener-response').prop('disabled', true);
          $('#error').show();
       };
     };
    });
  },
  trials: 1
};

var intro = {
    name: 'intro',
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in our study. You will be asked to infer how a writer feels towards climate change, based on a sentence they have written. You will then be asked about your own views. We are collecting \
    these annotations of stance in order to conduct linguistic analyses of verbs. The task contains 35 sentences to annotate and will take you about 20-25 minutes to complete.",
    "legal_info": "<strong>LEGAL INFORMATION</strong>: You will be paid for your participation at the posted rate. There are no risks or benefits of any kind involved in this study.<br><br>If you have read \
    this form and decided to participate in this experiment, please understand that your participation is voluntary and you have the right to withdraw your consent or discontinue participation without penalty or \
  loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. \
  <br><br>You may print this form for your records.<br><br>CONTACT INFORMATION:<br>If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should \
  contact the Protocol Director Meghan Sumner at <br>(650)-725-9336<br><br>If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about \
  the research or your rights as a participant, please contact the Stanford  Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. \
  You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.",
    // introduction's slide proceeding button text
    "buttonText": "Begin experiment",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            legal_info: this.legal_info,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructions = {
    name: 'instructions',
    // introduction title
    "title": "For each sentence, you will judge whether it expresses a view that aligns with the target opinion below:",
    // introduction text
    "text": "<strong>Target opinion: People should worry about global warming.</strong>\
    <p>There are four options you may choose from:\
    <br><br> \t1. AGREE (the sentence agrees with the target opinion) \
    <br><br> \t2. DISAGREE (the sentence disagrees with the target opinion) \
    <br><br> \t3. NEUTRAL (it is unclear whether or not the sentence aligns with the target opinion, but the sentence is still about a related topic) \
      <br><br> \t4. IRRELEVANT (the sentence is not relevant to the target opinion at all) </p>",
    // introduction's slide proceeding button text
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#instructions-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        $('#helpText').css('display', 'none');

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });


    },
    // for how many trials should this view be repeated?
    trials: 1
};


var warning = {
    name: 'warning',
    // introduction title
    "title": "Please read the instructions on the next page carefully.",
    // introduction text
    "text": "We check responses carefully in order to make sure that people have read the instructions for the task and responded carefully. We will only accept participants who clearly demonstrate that they have understood the task.",
    // introduction's slide proceeding button text
    "buttonText": "I understand. Let's begin!",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#warning-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var practice1 = {
    name: 'practice1',
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        $('html,body').scrollTop(0);

        var viewTemplate = $('#practice1-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[0].sentence,
            option1: exp.trial_info.practice_trials[0].option1,
            option2: exp.trial_info.practice_trials[0].option2,
            option3: exp.trial_info.practice_trials[0].option3,
            option4: exp.trial_info.practice_trials[0].option4
        }));
        var startingTime = Date.now();
        $('p[name=answer-box]').hide().delay(3000)

        $('input[name=answer]').prop('disabled', true);
        setTimeout(function(){
          $('input[name=answer]').prop('disabled', false);
          // change button color
          $('p[class=answer-container]').show()
        }, 3500);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 1,
                sentence: exp.trial_info.practice_trials[0].sentence,
                condition: exp.trial_info.practice_trials[0].condition,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            //exp.trial_data.push(trial_data);
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var practice2 = {
    name: 'practice2',
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#practice2-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[1].sentence,
            option1: exp.trial_info.practice_trials[1].option1,
            option2: exp.trial_info.practice_trials[1].option2,
            option3: exp.trial_info.practice_trials[1].option3,
            option4: exp.trial_info.practice_trials[1].option4
        }));
        var startingTime = Date.now();
        $('p[name=answer-box]').hide().delay(3000)

        $('input[name=answer]').prop('disabled', true);
        setTimeout(function(){
          $('input[name=answer]').prop('disabled', false);
          // change button color
          $('p[class=answer-container]').show()
        }, 3500);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 1,
                sentence: exp.trial_info.practice_trials[1].sentence,
                condition: exp.trial_info.practice_trials[1].condition,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            //exp.trial_data.push(trial_data);
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var practice3 = {
    name: 'practice3',
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#practice3-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[2].sentence,
            option1: exp.trial_info.practice_trials[2].option1,
            option2: exp.trial_info.practice_trials[2].option2,
            option3: exp.trial_info.practice_trials[2].option3,
            option4: exp.trial_info.practice_trials[2].option4
        }));
        var startingTime = Date.now();
        $('p[name=answer-box]').hide().delay(3000)

        $('input[name=answer]').prop('disabled', true);
        setTimeout(function(){
          $('input[name=answer]').prop('disabled', false);
          // change button color
          $('p[class=answer-container]').show()
        }, 3500);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 1,
                sentence: exp.trial_info.practice_trials[2].sentence,
                condition: exp.trial_info.practice_trials[2].condition,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            //exp.trial_data.push(trial_data);
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var practice4 = {
    name: 'practice4',
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#practice4-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[3].sentence,
            option1: exp.trial_info.practice_trials[3].option1,
            option2: exp.trial_info.practice_trials[3].option2,
            option3: exp.trial_info.practice_trials[3].option3,
            option4: exp.trial_info.practice_trials[3].option4
        }));
        var startingTime = Date.now();
        $('p[name=answer-box]').hide().delay(3000)

        $('input[name=answer]').prop('disabled', true);
        setTimeout(function(){
          $('input[name=answer]').prop('disabled', false);
          // change button color
          $('p[class=answer-container]').show()
        }, 3500);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 1,
                sentence: exp.trial_info.practice_trials[3].sentence,
                condition: exp.trial_info.practice_trials[3].condition,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            //exp.trial_data.push(trial_data);
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var practice5 = {
    name: 'practice5',
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#practice5-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[4].sentence,
            option1: exp.trial_info.practice_trials[4].option1,
            option2: exp.trial_info.practice_trials[4].option2,
            option3: exp.trial_info.practice_trials[4].option3,
            option4: exp.trial_info.practice_trials[4].option4
        }));
        var startingTime = Date.now();
        $('p[name=answer-box]').hide().delay(3000)

        $('input[name=answer]').prop('disabled', true);
        setTimeout(function(){
          $('input[name=answer]').prop('disabled', false);
          // change button color
          $('p[class=answer-container]').show()
        }, 3500);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 1,
                sentence: exp.trial_info.practice_trials[4].sentence,
                condition: exp.trial_info.practice_trials[4].condition,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            //exp.trial_data.push(trial_data);
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var practice6 = {
    name: 'practice6',
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#practice6-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[5].sentence,
            option1: exp.trial_info.practice_trials[5].option1,
            option2: exp.trial_info.practice_trials[5].option2,
            option3: exp.trial_info.practice_trials[5].option3,
            option4: exp.trial_info.practice_trials[5].option4
        }));
        var startingTime = Date.now();
        $('p[name=answer-box]').hide().delay(3000)

        $('input[name=answer]').prop('disabled', true);
        setTimeout(function(){
          $('input[name=answer]').prop('disabled', false);
          // change button color
          $('p[class=answer-container]').show()
        }, 3500);

        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 1,
                sentence: exp.trial_info.practice_trials[5].sentence,
                condition: exp.trial_info.practice_trials[5].condition,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            //exp.trial_data.push(trial_data);
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var feedback1 = {
    name: 'feedback1',
    'buttonText': "Next example",
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#feedback1-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[0].sentence,
            option1: exp.trial_info.practice_trials[0].option1,
            option2: exp.trial_info.practice_trials[0].option2,
            option3: exp.trial_info.practice_trials[0].option3,
            option4: exp.trial_info.practice_trials[0].option4
        }));
        var startingTime = Date.now();

        $('button').hide().delay(3000)

        $('button').prop('disabled', true);
        setTimeout(function(){
          $('button').prop('disabled', false);
          // change button color
          $('button').show()
        }, 3500);

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var feedback2 = {
    name: 'feedback2',
    'buttonText': "Next example",
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#feedback2-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[1].sentence,
            option1: exp.trial_info.practice_trials[1].option1,
            option2: exp.trial_info.practice_trials[1].option2,
            option3: exp.trial_info.practice_trials[1].option3,
            option4: exp.trial_info.practice_trials[1].option4
        }));
        var startingTime = Date.now();

        $('button').hide().delay(3000)

        $('button').prop('disabled', true);
        setTimeout(function(){
          $('button').prop('disabled', false);
          // change button color
          $('button').show()
        }, 3500);

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var feedback3 = {
    name: 'feedback3',
    'buttonText': "Next example",
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#feedback3-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[2].sentence,
            option1: exp.trial_info.practice_trials[2].option1,
            option2: exp.trial_info.practice_trials[2].option2,
            option3: exp.trial_info.practice_trials[2].option3,
            option4: exp.trial_info.practice_trials[2].option4
        }));
        var startingTime = Date.now();

        $('button').hide().delay(3000)

        $('button').prop('disabled', true);
        setTimeout(function(){
          $('button').prop('disabled', false);
          // change button color
          $('button').show()
        }, 3500);

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var feedback4 = {
    name: 'feedback4',
    'buttonText': "Next example",
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#feedback4-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[3].sentence,
            option1: exp.trial_info.practice_trials[3].option1,
            option2: exp.trial_info.practice_trials[3].option2,
            option3: exp.trial_info.practice_trials[3].option3,
            option4: exp.trial_info.practice_trials[3].option4
        }));
        var startingTime = Date.now();

        $('button').hide().delay(3000)

        $('button').prop('disabled', true);
        setTimeout(function(){
          $('button').prop('disabled', false);
          // change button color
          $('button').show()
        }, 3500);

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var feedback5 = {
    name: 'feedback5',
    'buttonText': "Next example",
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#feedback5-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[4].sentence,
            option1: exp.trial_info.practice_trials[4].option1,
            option2: exp.trial_info.practice_trials[4].option2,
            option3: exp.trial_info.practice_trials[4].option3,
            option4: exp.trial_info.practice_trials[4].option4
        }));
        var startingTime = Date.now();

        $('button').hide().delay(3000)

        $('button').prop('disabled', true);
        setTimeout(function(){
          $('button').prop('disabled', false);
          // change button color
          $('button').show()
        }, 3500);

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var feedback6 = {
    name: 'feedback6',
    'buttonText': "Next example",
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#feedback6-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.practice_trials[5].sentence,
            option1: exp.trial_info.practice_trials[5].option1,
            option2: exp.trial_info.practice_trials[5].option2,
            option3: exp.trial_info.practice_trials[5].option3,
            option4: exp.trial_info.practice_trials[5].option4
        }));
        var startingTime = Date.now();

        $('button').hide().delay(3000)

        $('button').prop('disabled', true);
        setTimeout(function(){
          $('button').prop('disabled', false);
          // change button color
          $('button').show()
        }, 3500);

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });
        // record trial starting time
        startingTime = Date.now();

    },
    trials : 1
};

var postPractice = {
    name: 'postPractice',
    // introduction title
    "title": "",
    // introduction text
    "text": "Great! You will now begin the main trials.",
    // introduction's slide proceeding button text
    "buttonText": "Begin",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#postpractice-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));
        exp.global_data.practiceEndTime = Date.now();
        exp.global_data.practiceTimeSpent = (exp.global_data.practiceEndTime - exp.global_data.startTime) / 60000;

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var main = {
    name: 'main',
    // render function renders the view
    render: function(CT) {

        // fill variables in view-template
        var viewTemplate = $('#main-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            sentence: exp.trial_info.main_trials[CT].sentence,
            option1: exp.trial_info.main_trials[CT].option1,
            option2: exp.trial_info.main_trials[CT].option2,
            option3: exp.trial_info.main_trials[CT].option3,
            option4: exp.trial_info.main_trials[CT].option4
        }));
        var startingTime = Date.now();
        var delayTime = exp.trial_info.main_trials[CT].sentence.length*25;
        $('p[name=answer-box]').hide().delay(delayTime)

        // update the progress bar based on how many trials there are in this round
        var filled = exp.currentTrialInViewCounter * (180 / exp.views_seq[exp.currentViewCounter].trials);
        $('#filled').css('width', filled);

        $('input[name=answer]').prop('disabled', true);
        setTimeout(function(){
          $('input[name=answer]').prop('disabled', false);
          // change button color
          $('p[class=answer-container]').show()
        }, delayTime);

        $('input[name=answer]').on('change', function() {
            var RT = Date.now() - startingTime; // measure RT before anything else
            var trial_data = {
                trial_number: CT + 1,
                condition: exp.trial_info.main_trials[CT].condition,
                trial_sent_id: exp.trial_info.main_trials[CT].sent_id,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT,
                df_index: exp.trial_info.main_trials[CT].df_key,
            };
            if (exp.trial_info.main_trials[CT].sent_id == 't19') {
              exp.trial_data.t19 = $('input[name=answer]:checked').val();
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });
    },
    trials : main_trials.length
};

var debrief = {
    name: 'debrief',
    // introduction title
    "title": "Debrief",
    // introduction text
    "text": "",
    // introduction's slide proceeding button text
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#debrief-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText,
            t19_choice: exp.trial_data.t19,
            sentence: "There's no longer any serious doubt that climate change is real, accelerating, and caused by human activities."
        }));

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var comments = {
    name: 'comments',
    // introduction title
    "title": "Comments",
    // introduction text
    "text": "Thank you for completing the task! If you have any general comments on the task that you'd like to leave, please do so below.",
    // introduction's slide proceeding button text
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#comments-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function() {
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.criticisms = $('#criticisms').val().trim();
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var prePoll = {
    name: 'prePoll',
    // introduction title
    "title": "Additional Info",
    // introduction text
    "text": "Finally, we will ask you about your own views in a series of 7 questions.",
    // introduction's slide proceeding button text
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#prepoll-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function() {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var postTest = {
    name: 'postTest',
    "title": "Additional Info",
    "text": "Answering the following questions will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));
        $('#error').hide();

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.HitCorrect = $('#HitCorrect').val();
            exp.global_data.HitFamiliar = $('#HitFamiliar').val();
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.party = $('#party').val();
            exp.global_data.state = $('#state').val();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // response correct
            if (exp.global_data.HitCorrect && exp.global_data.HitFamiliar && exp.global_data.age && exp.global_data.gender
            && exp.global_data.education && exp.global_data.party && exp.global_data.state) {
              //exp.global_data.botresponse = $('#listener-response').val();
              //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
              exp.findNextView();

              // response false
            }
            else {
              $('#error').show();
            }
            });
      },
    trials: 1
};

var poll1 = {
    name: 'poll1',
    "title": "Additional Info",
    "text": "Answering the following questions will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#poll1-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            buttonText: this.buttonText
        }));
        $('#error').hide();

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.poll1 = $('input[name=happening]:checked').val();

            // response correct
            if (exp.global_data.poll1) {
              //exp.global_data.botresponse = $('#listener-response').val();
              //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
              exp.findNextView();

              // response false
            }
            else {
              $('#error').show();
            }
            });
      },
    trials: 1
};

var poll2 = {
    name: 'poll2',
    "title": "Additional Info",
    "text": "Answering the following questions will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#poll2-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            buttonText: this.buttonText,
            negation: exp.global_data.poll1.trim(),
        }));
        $('#error').hide();

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.poll2 = $('input[name=certainty]:checked').val();

            // response correct
            if (exp.global_data.poll2) {
              //exp.global_data.botresponse = $('#listener-response').val();
              //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
              exp.findNextView();

              // response false
            }
            else {
              $('#error').show();
            }
            });
      },
    trials: 1
};

var poll3 = {
    name: 'poll3',
    "title": "Additional Info",
    "text": "Answering the following questions will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#poll3-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            buttonText: this.buttonText,
        }));
        $('#error').hide();

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.poll3 = $('input[name=causes]:checked').val();

            // response correct
            if (exp.global_data.poll3) {
              //exp.global_data.botresponse = $('#listener-response').val();
              //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
              exp.findNextView();

              // response false
            }
            else {
              $('#error').show();
            }
            });
      },
    trials: 1
};

var poll4 = {
    name: 'poll4',
    "title": "Additional Info",
    "text": "Answering the following questions will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#poll4-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            buttonText: this.buttonText,
        }));
        $('#error').hide();

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.poll4 = $('input[name=govt]:checked').val();

            // response correct
            if (exp.global_data.poll4) {
              //exp.global_data.botresponse = $('#listener-response').val();
              //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
              exp.findNextView();

              // response false
            }
            else {
              $('#error').show();
            }
            });
      },
    trials: 1
};

var poll5 = {
    name: 'poll5',
    "title": "Additional Info",
    "text": "Answering the following questions will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#poll5-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            buttonText: this.buttonText,
        }));
        $('#error').hide();

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.poll5 = $('input[name=concern]:checked').val();

            // response correct
            if (exp.global_data.poll5) {
              //exp.global_data.botresponse = $('#listener-response').val();
              //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
              exp.findNextView();

              // response false
            }
            else {
              $('#error').show();
            }
            });
      },
    trials: 1
};

var poll6 = {
    name: 'poll6',
    "title": "Additional Info",
    "text": "Answering the following questions will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#poll6-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            buttonText: this.buttonText,
        }));
        $('#error').hide();

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.poll6 = $('input[name=exposure]:checked').val();

            // response correct
            if (exp.global_data.poll6) {
              //exp.global_data.botresponse = $('#listener-response').val();
              //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
              exp.findNextView();

              // response false
            }
            else {
              $('#error').show();
            }
            });
      },
    trials: 1
};

var poll7 = {
    name: 'poll7',
    "title": "Additional Info",
    "text": "Answering the following questions will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render: function() {
        var viewTemplate = $('#poll7-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            buttonText: this.buttonText,
        }));
        $('#error').hide();

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.poll7 = $('input[name=trust]:checked').val();

            // response correct
            if (exp.global_data.poll7) {
              //exp.global_data.botresponse = $('#listener-response').val();
              //exp.global_data.betwsubj = COMPETITOR_TYPICALITY;
              exp.findNextView();

              // response false
            }
            else {
              $('#error').show();
            }
            });
      },
    trials: 1
};

var thanks = {
    name: 'thanks',
    message: "Thank you for taking part in this experiment!",
    render: function() {
        var viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
        //    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />".concat('<a href=', config_deploy.prolificURL, ' class="prolific-url">Finished!</a>')
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
};
