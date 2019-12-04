// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

    // specify view order
    this.views_seq = [
        botcaptcha,
        intro,
        warning,
        instructions,
        practice1,
        feedback1,
        practice2,
        feedback2,
        practice3,
        feedback3,
        practice4,
        feedback4,
        practice5,
        feedback5,
        practice6,
        feedback6,
        postPractice,
        main,
        comments,
        postTest,
        prePoll,
        poll1,
        poll2,
        poll3,
        poll4,
        poll5,
        poll6,
        poll7,
        thanks
    ];

    // prepare information about trials (procedure)
    // randomize main trial order, but keep practice trial order fixed
    this.trial_info.main_trials = _.shuffle(main_trials);
    this.trial_info.practice_trials = practice_trials;
    // adds progress bars to the views listed
    // view's name is the same as object's name
    this.progress_bar_in = ['main'];
    // this.progress_bar_in = ['practice', 'main'];
    // styles: chunks, separate or default
    this.progress_bar_style = 'default';
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 100;
};
