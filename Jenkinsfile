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
def runDocker(String command) {
    withCredentials(bindings: [
            usernamePassword(credentialsId: NPM_CREDENTIAL_ID, usernameVariable:"NPM_EMAIL", passwordVariable: "NPM_TOKEN")
    ]) {
        sh "docker run -u `id -u` -e NPM_EMAIL -e NPM_TOKEN --rm -v `pwd`:/app $BUILDER_DOCKER_NAME sh -c '$command'"
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
                runDocker('npx lerna bootstrap')
                runDocker('npx lerna run build')
            }
        }
        stage("test") {
            steps {
                runDocker('npx lerna run test-ci')
                archiveArtifacts artifacts: "packages/forms-next-core/test-reports/junit.xml"
                archiveArtifacts artifacts: "packages/forms-next-react-core-components/test-reports/junit.xml"
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
        stage("publish") {
            when {
                allOf {
                    expression { return !isPullRequest() }
                    branch "main"
                    expression { return !(gitStrategy.latestCommitMessage() ==~ ".*:release.*")}
                }
            }
            steps {
                script {
                    gitStrategy.checkout(env.BRANCH_NAME)
                    runDocker('''npx lerna version patch --no-git-tag-version --no-push --yes
                    echo ":release" > message.txt
                    jq -r "(.name + \\" \\" + .version)" packages/*/package.json >> message.txt
                    ''')
                    sh "git add package.json package-lock.json packages/*/package.json packages/*/package-lock.json"
                    gitStrategy.impersonate("cqguides", "cqguides") {
                        sh "git commit -F message.txt"
                        sh "tail -3 message.txt | while read in; do git tag \$in; done"
                        gitStrategy.push(env.BRANCH_NAME)
                    }
                    runDocker("npx lerna publish --yes")
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