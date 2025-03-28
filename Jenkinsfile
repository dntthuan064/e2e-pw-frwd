pipeline {
    agent any

    parameters {
        string(name: 'LENDERS', defaultValue: 'kcchamber,launchkc', description: 'Comma-separated list of lenders to run tests against')
        string(name: 'E2E_TAGS', defaultValue: '@smoke', description: 'Tags to run (e.g. @smoke, @regression)')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Environment to run tests against')
        booleanParam(name: 'RUN_MOBILE_TESTS', defaultValue: false, description: 'Whether to run mobile tests')
    }

    environment {
        NODE_VERSION = '18.17.0'
        PLAYWRIGHT_VERSION = '1.42.0'
        // Environment-specific URLs will be set based on the ENVIRONMENT parameter
        DEV_BASE_URL = 'https://dev.example.com'
        STAGING_BASE_URL = 'https://staging.example.com'
        PROD_BASE_URL = 'https://example.com'
    }

    tools {
        nodejs 'NodeJS 18'
    }

    stages {
        stage('Setup') {
            steps {
                // Setup Node.js
                sh """
                    export NVM_DIR="\$HOME/.nvm"
                    [ -s "\$NVM_DIR/nvm.sh" ] && . "\$NVM_DIR/nvm.sh"
                    nvm install \${NODE_VERSION}
                    nvm use \${NODE_VERSION}
                """

                // Install dependencies
                sh 'yarn install'

                // Install Playwright browsers
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Lint') {
            steps {
                sh 'yarn lint'
            }
        }

        stage('Web Tests') {
            steps {
                script {
                    // Set base URL based on environment
                    def baseUrl = ""
                    switch(params.ENVIRONMENT) {
                        case 'dev':
                            baseUrl = env.DEV_BASE_URL
                            break
                        case 'staging':
                            baseUrl = env.STAGING_BASE_URL
                            break
                        case 'prod':
                            baseUrl = env.PROD_BASE_URL
                            break
                    }
                }
            }

        stage('Mobile Tests') {
            when {
                expression { return params.RUN_MOBILE_TESTS }
            }
            steps {
                sh 'yarn appium:start &'
                sh 'sleep 5' // Wait for Appium to start
                sh 'yarn test:mobile'
            }
        }
    }

    post {
        always {
            // Archive test results and reports
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true

            // Clean workspace
            cleanWs()

            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'cucumber-report.html,cucumber-web-report.html,cucumber-mobile-report.html',
                reportName: 'Cucumber Reports'
            ])
        }

        success {
            echo 'All tests completed successfully!'
        }

        unstable {
            echo 'Some tests failed! Check the test report for details.'
        }

        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
    }
}
