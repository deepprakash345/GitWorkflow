@Library(['com.adobe.qe.evergreen.sprout'])
@Library(['com.adobe.qe.evergreen.forms.sprout'])
import com.adobe.qe.evergreen.sprout.SproutConfig
import com.adobe.qe.evergreen.sprout.vcs.Repository
import com.adobe.qe.evergreen.sprout.vcs.RepositoryFactory

SproutConfig config = new SproutConfig()
config.setGithubAccessTokenId("cq-guides-password")
Repository gitStrategy = RepositoryFactory.getStrategy(Repository.GIT, this)

def prepareSample = false
def deploySample = false

DIFF_COVERAGE_FAIL_THRESHOLD = 80
NPM_CREDENTIAL_ID = "CQGUIDES_ARTIFACTORY_NPM_TOKEN"
BUILDER_DOCKER_NAME="af2-web-runtime-builder"
BUILDER_DOCKER_NAME_14="af2-web-runtime-builder_14"
GIT_REPO_URL="git@git.corp.adobe.com:livecycle/forms-next-web-runtime.git"
def runDocker(String command) {
    withCredentials(bindings: [
            usernamePassword(credentialsId: NPM_CREDENTIAL_ID, usernameVariable:"NPM_EMAIL", passwordVariable: "NPM_TOKEN")
    ]) {
        sh "docker run -u `id -u` -e REACT_APP_AEM_URL -e REACT_APP_AUTH_REQUIRED -e NPM_EMAIL -e NPM_TOKEN --rm -v `pwd`:/app $BUILDER_DOCKER_NAME sh -c '$command'"
    }
}

def runDocker14(String command) {
    withCredentials(bindings: [
            usernamePassword(credentialsId: NPM_CREDENTIAL_ID, usernameVariable:"NPM_EMAIL", passwordVariable: "NPM_TOKEN")
    ]) {
        sh "docker run -e NPM_EMAIL -e NPM_TOKEN --rm -v `pwd`:/app $BUILDER_DOCKER_NAME_14 sh -c '$command'"
    }
}

COVERAGE_CHECKS=[["forms-next-core", 90],["forms-next-react-core-components", 90]]

def cleanUp() {
    sh "docker rmi -f $BUILDER_DOCKER_NAME || 1"
}

def diffCoverage(String targetBranch, String packageName, Integer failThreshold) {
    echo "checking coverage for packages/${packageName}/target/coverage/diff-cover.html"
    status = sh(script:"diff-cover --html-report packages/${packageName}/target/coverage/diff-cover.html --compare-branch ${targetBranch} packages/${packageName}/target/coverage/cobertura-coverage.xml --fail-under=${failThreshold}",
            returnStatus: true)
    archiveArtifacts artifacts: "packages/${packageName}/target/coverage/diff-cover.html"
    return status
}

def checkCoverage(packages) {
    for (int i = 0; i < packages.size(); i++) {
        status = diffCoverage("origin/${this.env.CHANGE_TARGET}", packages[i][0], packages[i][1])
        if (status != 0) {
            error("Coverage failed for ${packages[i][0]}")
        }
    }
    return 0
}

def isPullRequest() {
    if (this.env.CHANGE_TARGET)
        return true
    return false
}

pipeline {
    agent {
        label 'centos'
    }
    stages {
        stage("build - environment") {
            steps {
                sh "git submodule init"
                sh "git submodule update"
                sh "sudo docker build -t $BUILDER_DOCKER_NAME -f Dockerfile.build.mt ."
                sh "sudo docker build -t $BUILDER_DOCKER_NAME_14 -f Dockerfile_14.build.mt ."
            }
        }
        stage("test - node14") {
            steps {
                runDocker14('npm ci')
                runDocker14('npx lerna bootstrap --ci --hoist --strict')
                runDocker14('npx lerna run build')
                runDocker14('npx lerna run test')
            }
        }
        stage("build - packages") {
            steps {
                sh "sudo rm -rf node_modules packages/*/node_modules packages/*/lib packages/*/build packages/*/target"
                sh "git checkout ."
                runDocker('npm ci')
                runDocker('npx lerna bootstrap --ci --hoist --strict')
                runDocker('npx lerna run build')
            }
        }
        stage("test") {
            steps {
                runDocker('npx lerna run test-ci')
                archiveArtifacts artifacts: "packages/forms-next-react-core-components/target/**"
                archiveArtifacts artifacts: "packages/forms-next-core/target/**"
                archiveArtifacts artifacts: "packages/react-bindings/target/**"
                junit "packages/forms-next-core/target/test-reports/junit.xml"
                junit "packages/forms-next-react-core-components/target/test-reports/junit.xml"
                junit "packages/react-bindings/target/test-reports/junit.xml"
           }
        }
        stage("diff coverage") {
            when {
                expression { return isPullRequest() }
            }
            steps {
                checkCoverage(COVERAGE_CHECKS)
            }
        }
        stage("performance test") {
          when {
                expression { return isPullRequest() }
          }
          steps {
            runDocker('lhci autorun')
          }
        }
        stage("docs") {
            when {
                expression { return isPullRequest() }
            }
            steps {
                runDocker('npx lerna run docs')
                sh 'git checkout .'
            }
        }
        stage("publish") {
            when {
                allOf {
                    expression { return !isPullRequest() }
                    branch "main"
                    expression { return !(gitStrategy.latestCommitMessage() ==~ ".*:release.*")}
                    anyOf {
                        changeset "**/src/**/*.css"
                        changeset "**/src/**/*.js"
                        changeset "**/src/**/*.ts"
                        changeset "**/src/**/*.tsx"
                        changeset "**/package.json"
                    }
                }
            }
            steps {
                script {
                    gitStrategy.checkout(env.BRANCH_NAME)
                    gitStrategy.impersonate("cqguides", "cqguides") {
                        runDocker("npx lerna version patch --no-push --yes -m \":release\"")
                        runDocker("npx lerna publish from-package --yes")
                        runDocker("npm run docs")
                        sh "git add -A ."
                        /** doing single commit to avoid multiple build runs **/
                        sh "git commit -a --amend --no-edit"
                        sh "git push ${GIT_REPO_URL} --tags"
                        gitStrategy.push(env.BRANCH_NAME)
                    }
                    prepareSample = true
                }
            }
        }
        stage("prepare sample") {
            when {
                allOf {
                    anyOf {
                       expression { return prepareSample }
                       changeset "**/*.stories.tsx"
                       changeset "**/*.mdx"
                       changeset "**/stories/**/*.tsx"
                       changeset "**/.storybook/*.js"
                    }
                    expression { return !isPullRequest() }
                    branch "main"
                }
            }
            steps {
                script {
                    sh "git pull ${GIT_REPO_URL}"
                    runDocker('npx lerna run build --scope=forms-headless-sample')
                    runDocker("npx lerna run build-storybook")
                    sh 'mkdir tmp-dist'
                    sh 'mkdir tmp-story'
                    sh 'cp -R packages/forms-headless-sample/build/* tmp-dist '
                    sh 'cp -R packages/forms-next-react-core-components/storybook-static/* tmp-story'
                    sh 'git checkout .'
                    sh 'git checkout gh-pages'
                    sh 'rm -r dist'
                    sh 'mv tmp-dist dist'
                    sh 'rm -r story'
                    sh 'mv tmp-story story'
                    sh 'git add -A .'
                    deploySample = true
                }
            }
        }
        stage("deploy sample") {
            when {
                allOf {
                    expression { return deploySample }
                    expression { return !isPullRequest() }
                    branch "main"
                    expression { return gitStrategy.hasUncomittedChanges() }
                }
            }
            steps {
                script {
                    sh 'git commit -m "deploying to git pages" || 1'
                    gitStrategy.impersonate("cqguides", "cqguides") {
                        gitStrategy.push('gh-pages')
                    }
                }
            }
        }
    }
    post {
        always {
            cleanUp()
            cleanWs()
        }
    }
}