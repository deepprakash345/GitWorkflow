@Library(['com.adobe.qe.evergreen.sprout'])
@Library(['com.adobe.qe.evergreen.forms.sprout'])

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
        label 'AEMDS_SJ_TestSlave2'
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
                runDocker('npx lerna run build --scope=@adobe/*')
            }
        }
        stage("test") {
            steps {
                runDocker('npx lerna run test-ci')
            }
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
                    runDocker("npx lerna version patch --yes --message ':release Updating version'")
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