<!-- ## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

### Add your files

- [ ] [Create](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file)
      or
      [upload](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file)
      files
- [ ] [Add files using the command line](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line)
      or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://gitlab.com/bebrahimy19/nireeka_next_project.git
git branch -M main
git push -uf origin main
```

### Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://gitlab.com/bebrahimy19/nireeka_next_project/-/settings/integrations)

### Collaborate with your team

- [ ] [Invite team members and collaborators](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Automatically merge when pipeline succeeds](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

### Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://gitlab.com/-/experiment/new_project_readme_content:9e503faf90e2dc34a641e5eb27e2aed2?https://docs.gitlab.com/ee/ci/environments/protected_environments.html) -->

# Git Flow

## Configs
Enabled prune to update the branch list every time you fetch or pull.
```Bash
git config remote.origin.prune true
```


## `feature-*` branches

Any feature that is under development must have its own branch. These are called feature branches
and are prefixed with `feature-`, after the `-` comes the name of the feature (e.g.
feature-configurator-gallery).

These branches are created from the current `main` branch and are **deleted** after being merged
with the `main` branch.

To create a feature branch on your local machine, simply run these commands:

```Bash
git checkout main
git fetch
git pull
git checkout -b feature-[FEATURE_NAME] main
```

And start developing on that branch.

To delete the branch only on your local machine:

```Bash
git checkout main
git branch -D feature-[FEATURE_NAME]
```

To merge these branches into the main branch:

1. Check if all pipelines are passed successfully.
2. Create a merge request from the feature branch to main branch on gitlab.
3. Check the changes and confirm that your changes are actually being applied
4. Resolve any conflicts if there is any. (You might need to do it locally. In that case
   instructions are given by gitlab).
5. Make sure _Delete source branch_ is **checked**.
6. Make sure _Squash commits_ is **not checked**.
7. Submit the merge.

## `hotfix-*` branches

If we encounter any bug or any changes that is supposed to be fixed immediately and independently
from the feature you are actually working on, simply create a hotfix branch.

These branches are created from the current `main` branch and are **deleted** after being merged
with the `main` branch.

To create a hotfix branch in the middle of a feature development, there are two scenarios.
1.Your work on the feature branch is somewhere that you can commit them and checkout. Then inside the feature branch you have to run:  
```Bash
git add .
git commit -m "Commit message"
git checkout main
git fetch
git pull origin main
git checkout -b hotfix-[HOTFIX_NAME] main
```
Then make your changes inside that newly created hotfix branch.
After you've done the fix, create a merge request on Git Lab, just as described in the [feature branch section](#feature--branches).

## `main` branch

We have the `main` branch that is supposed to be the production branch. Since we currently do not
have a CI/CD strategy, this branch is pulled on the server and is manually built.

Never directly develop inside `main` branch.  
Never merge `main` branch into other branches.

# Naming Conventions

## Case

All "**component**" files must be named in **PascalCase** (as well as the component itself).

Any other directories or files are named in **camelCase**.  
Including page slugs (i.e. pages with dynamic names like `/shop/accessories/[productId]`).

Except: Files including constants. These files are named in **SCREAMING_SNAKE_CASE**.

## File Names

All file names, either being a component file or a regular javascript file like helpers, have a
`.js` extension. And not a `.jsx`.

# Components

## General components

The `components/Atoms` directory contains all the multi purpose components like inputs, buttons,
cards, modals and etc.

## Feature specific components

All the other components that are meant to be more specific to a certain feature, have their own
separate feature directory (e.g. for components specific to configurator we have a directory named
`/components/configurator`).
# nireeka
