<h1 class="page-header">Versioning</h1>

In order to start development you should have Git version control system installed [https://git-scm.com/](https://git-scm.com/). Once you have installed this you can clone remote repository to your local environment:

	git clone http://git.tecnotree.com/tec_common/ui-lib.git

## Branching

There are many possible ways of working with version control system to develop and maintain the code. This way of working is called workflow, which describes policies and guidelines of branching and commiting changes.

In UI-Lib project we use `Feature Branch Workflow`. The core idea behind the Feature Branch Workflow is that all feature development should take place in a dedicated branch instead of the master branch. This encapsulation makes it easy for multiple developers to work on a particular feature without disturbing the main codebase. It also means the master branch will never contain broken code, which is a huge advantage for continuous integration environments. 

The main idea standing behind `Feature Branching` is that every new feature or bugfix is firstly created on separeted branch, while master branch remains untouched. Besides `feature branches` there are 2 other special branches: `master` and `develop`. This approach enables every change to be reviewed by other developers before introducing them into main codebase which resides in `master`/ `develop` branches. It is important to know that `master` is production branch, `develop` is development branch. If you would like to read more about this workflow read [Feature Branching](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow).

<img src="../assets/img/branching.svg" style="width: 80%">

## Commiting process

There is a strict policy describing steps that should be undertaken in order to introduce changes to `develop` branch. These steps are:

1. Make sure you work on newest version of code.

        git checkout develop
        git pull
2. Create new branch in your local environment

        git checkout -b feature-big-login-window
3. Implement feature and test code
4. Commit your code

        git commit -am "Change login window in front page"
5. Before pushing changes sync with codebase

        git fetch
		git merge origin/develop
6. Fix potential conflicts
7. Push code to remote repository

        git push origin feature-big-login-window

8. Create **MERGE REQUEST** to develop branch in GitLab TEC_COMMON/ui-lib project:
	*Merge Requests* -> *New Merge Request*

        http://git.tecnotree.com/tec_common/ui-lib

9. Wait for **APPROVAL** in form of comment or adjust your code to other comments if present (Step 1)

10. Merge your code by clicking *Accept Merge Request* (Step 2)

11. Merging code triggers Jenkins build job (Project TEC-UI-Lib). **Wait until this job finishes successfully or fix build errors if present**.

<img src="../assets/img/approve_merge_request.png" style="width: 80%">

## Publishing releases

In order to publish new release from `develop` branch into `master` branch there are some steps that should be undertaken:

1. Switch to develop branch and pull changes

        git checkout develop
        git pull
2. Rise project's version (major, minor or patch) by running a script in main project's path (containing *package.json*):

        npm run release:patch
3. Run tests and build application

        grunt karma:unit build karma:jenkins
4. Commit changes

        git commit -am "Release v0.1.1"
5. Switch to master, pull changes and merge develop into master

        git checkout master
        git pull
        git merge develop
6. Add tags with new version to master branch

        git tag v0.1.1
        git tag 0.1.1
7. Push master and develop branch

        git push -v --tags origin master
        git push origin develop

## Commit naming

Commit name should be explainative and describe what was introduced, so that other developers easily catch the context and understand them. Another reason for descriptive commit messages is that they can be used for automatic generation of release notes. There are some simple rules to follow when writing commit message:

* Capitalize the message
* Do not end the message with a period
* Use imperative mood so that message can complete the sentence: <i>If applied, this commit will **MESSAGE**</i>
	* Good example: <i>If applied, this commit will <b style='color:green'>fix failing CompositePropertySourceTests</b></i>
	* Bad example:  <i>If applied, this commit will <b style='color:red'>changing behavior of SendMessage method</b></i>

Some good examples of commit messages are:

	Fix failing CompositePropertySourceTests
	Rework @PropertySource early parsing logic
	Add tests for ImportSelector meta-data

If you want to read more about commit naming conventions look at:
[http://chris.beams.io/posts/git-commit/](http://chris.beams.io/posts/git-commit/)

## Branch naming

There should be clear, highly-focused purpose for each branch. This purpose should be expressed by its descripive name that follows dash notation (hyphen separated) with specific prefix. Based on the change introduced in given branch those prefixes could be *feature*, *refactor*, *fix*, *unit*, *e2e*. If changes from given branch refer to Jira ticket there should also be another prefix with ticked id (ex. CLM-13). Example branches names could be:

	CLM-29-feature-jalali-calendar
	CLM-29-unit-jalali-calendar

	refactor-clear-select-plan
	fix-number-not-displayed-in-review
	e2e-white-sim-improvements
