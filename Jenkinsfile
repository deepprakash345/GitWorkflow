@Library(['com.adobe.qe.evergreen.sprout'])
@Library(['com.adobe.qe.evergreen.forms.sprout'])

DIFF_COVERAGE_FAIL_THRESHOLD = 80
NPM_CREDENTIAL_ID = "CQGUIDES_ARTIFACTORY_NPM_TOKEN"

def runDocker(String command) {
    withCredentials(bindings: [
            usernamePassword(credentialsId: NPM_CREDENTIAL_ID, usernameVariable:"NPM_EMAIL", passwordVariable: "NPM_TOKEN")
    ]) {
        sh "docker run -e NPM_EMAIL -e NPM_TOKEN --rm -v `pwd`:/app ts-builder sh -c '$command'"
    }
}

def cleanup() {
    sh "docker rmi -f ts-builder || 1"
}

def diffCoverage(String targetBranch, Integer failThreshold) {
    status = sh(script:"diff-cover --html-report diff-cover.html --compare-branch ${targetBranch} coverage/cobertura-coverage.xml --fail-under=${failThreshold}",
            returnStatus: true)
    archiveArtifacts artifacts: 'diff-cover.html'
    return status
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
        stage("clean - environment") {
            steps {
                sh "rm -r packages/*/node_modules"
                sh "rm -r packages/*/build"
                sh "rm -r packages/*/lib"
            }
        }
        stage("build - environment") {
            steps {
                sh "sudo docker build -t af2-web-runtime-builder -f Dockerfile.build.mt ."
            }
        }
        stage("build - packages") {
            steps {
                runDocker('npm install')
                runDocker('npx lerna bootstrap')
            }
        }
//         stage("test") {
//             steps {
//                 runDocker('cd af-expression-parser-ts && npx jest --coverage --coverageReporters=cobertura')
//             }
//         }

//         stage("coverage") {
//             when {
//                 expression { return isPullRequest() }
//             }
//             steps {
//                 dir("af-expression-parser-ts") {
//                     script {
//                         status = diffCoverage("origin/${this.env.CHANGE_TARGET}", DIFF_COVERAGE_FAIL_THRESHOLD)
//                         if(status != 0) {
//                             error("Failing pipeline due to low coverage.")
//                         }
//                     }
//                 }
//             }
//         }
//         stage("publish") {
//             when {
//                 expression {
//                     return !isPullRequest()
//                 }
//             }
//             steps {
//                 script {
//                     // clean the repository
//                     runDocker('''
//                         cd af-expression-parser-ts
//                         npm version patch -m 'Update version to %s'
//                         npm whoami
//                     ''')
//                 }
//             }
//         }
    }
}