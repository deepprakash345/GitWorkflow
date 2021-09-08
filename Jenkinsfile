@Library(['com.adobe.qe.evergreen.sprout'])
@Library(['com.adobe.qe.evergreen.forms.sprout'])
import com.adobe.qe.evergreen.sprout.SproutConfig
import com.adobe.qe.evergreen.sprout.vcs.Repository
import com.adobe.qe.evergreen.sprout.vcs.RepositoryFactory

SproutConfig config = new SproutConfig()
config.setGithubAccessTokenId("cq-guides-password")
Repository gitStrategy = RepositoryFactory.getStrategy(Repository.GIT, this)

DIFF_COVERAGE_FAIL_THRESHOLD = 80
NPM_CREDENTIAL_ID = "CQGUIDES_ARTIFACTORY_NPM_TOKEN"
BUILDER_DOCKER_NAME="af2-web-runtime-builder"
GIT_REPO_URL="git@git.corp.adobe.com:livecycle/forms-next-web-runtime.git"
def runDocker(String command) {
    withCredentials(bindings: [
            usernamePassword(credentialsId: NPM_CREDENTIAL_ID, usernameVariable:"NPM_EMAIL", passwordVariable: "NPM_TOKEN")
    ]) {
        sh "docker run -u `id -u` -e REACT_APP_AEM_URL -e REACT_APP_AUTH_REQUIRED -e NPM_EMAIL -e NPM_TOKEN --rm -v `pwd`:/app $BUILDER_DOCKER_NAME sh -c '$command'"
    }
}

COVERAGE_CHECKS=[["forms-next-core", 90],["forms-next-react-core-components", 90]]

def cleanUp() {
    sh "docker rmi -f $BUILDER_DOCKER_NAME || 1"
}

def diffCoverage(String targetBranch, String packageName, Integer failThreshold) {
    echo "checking coverage for packages/${packageName}/coverage/diff-cover.html"
    status = sh(script:"diff-cover --html-report packages/${packageName}/coverage/diff-cover.html --compare-branch ${targetBranch} packages/${packageName}/coverage/cobertura-coverage.xml --fail-under=${failThreshold}",
            returnStatus: true)
    archiveArtifacts artifacts: "packages/${packageName}/coverage/diff-cover.html"
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
                sh "sudo docker build -t $BUILDER_DOCKER_NAME -f Dockerfile.build.mt ."
            }
        }
        stage("build - packages") {
            steps {
                runDocker('npm install')
                runDocker('npx lerna bootstrap --ignore forms-headless-sample')
                runDocker('npx lerna run build --no-private')
            }
        }
        stage("test") {
            steps {
                runDocker('npx lerna run test-ci')
                archiveArtifacts artifacts: "packages/*/coverage"
                archiveArtifacts artifacts: "packages/*/test_reports"
                junit "packages/forms-next-core/test-reports/junit.xml"
                junit "packages/forms-next-react-core-components/test-reports/junit.xml"
           }
//             post {
//                 always {
//                   step([$class: 'CoberturaPublisher', coberturaReportFile: 'packages/forms-next-core/coverage/cobertura-coverage.xml'])
//                   step([$class: 'CoberturaPublisher', coberturaReportFile: 'packages/forms-next-react-core-components/coverage/cobertura-coverage.xml'])
//                 }
//               }
        }
        stage("coverage") {
            when {
                expression { return isPullRequest() }
            }
            steps {
                checkCoverage(COVERAGE_CHECKS)
            }
        }
        stage("build - sample") {
            environment {
                REACT_APP_AEM_URL = 'https://author-p9552-e11552-cmstg.adobeaemcloud.com'
                REACT_APP_AUTH_REQUIRED = 'true'
            }
            steps {
                dir("packages/forms-headless-sample") {
                    runDocker('npm install')
                    runDocker('npm run build')
                }
            }
        }
        stage("publish") {
            when {
                allOf {
                    expression { return !isPullRequest() }
                    branch "main"
                    expression { return !(gitStrategy.latestCommitMessage() ==~ "Publish.*")}
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
                        runDocker("npx lerna version patch --no-push --yes")
                        sh "git push ${GIT_REPO_URL} --tags"
                        gitStrategy.push(env.BRANCH_NAME)
                    }
                    runDocker("npx lerna publish from-package --yes")
                }
            }
        }
        stage("deploy - git pages") {
            when {
                allOf {
                    expression { return !isPullRequest() }
                    branch "main"
                    expression { return gitStrategy.latestCommitMessage() ==~ "Publish.*" }
                    anyOf {
                        changeset "packages/forms-headless-sample/**/*.css"
                        changeset "packages/forms-headless-sample/**/*.js"
                        changeset "packages/forms-headless-sample/**/*.ts"
                        changeset "packages/forms-headless-sample/**/*.tsx"
                        changeset "packages/forms-headless-sample/package.json"
                    }
                }
            }
            steps {
                script {
                    sh 'mkdir tmp-dist'
                    sh 'cp -R packages/forms-headless-sample/build/* tmp-dist '
                    sh 'git checkout .'
                    sh 'git checkout gh-pages'
                    sh 'rm -r dist'
                    sh 'mv tmp-dist dist'
                    sh 'git add -A .'
                    sh 'git commit -m "deploying to git pages"'
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