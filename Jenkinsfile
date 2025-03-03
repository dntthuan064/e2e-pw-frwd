pipeline {
    agent any

    parameters {
        string(name: 'LENDERS', defaultValue: 'kcchamber,launchkc', description: 'Comma-separated list of lenders to run tests against')
        string(name: 'E2E_TAGS', defaultValue: '@smoke', description: 'Tags to run (e.g. @smoke, @regression)')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Environment to run tests against')
    }

    environment {
        NODE_VERSION = '18.17.0'
        PLAYWRIGHT_VERSION = '1.42.0'
        // Environment-specific URLs will be set based on the ENVIRONMENT parameter
        DEV_BASE_URL = 'https://dev.example.com'
        STAGING_BASE_URL = 'https://staging.example.com'
        PROD_BASE_URL = 'https://example.com'
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

        stage('Run Tests') {
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

                    // Split lenders string into array
                    def lenders = params.LENDERS.split(',')

                    // Run tests for each lender
                    lenders.each { lender ->
                        try {
                            sh """
                                export E2E_BASE_URL="${baseUrl}"
                                export E2E_PORTAL_URL="${baseUrl}/portal"
                                export E2E_EMAIL_DOMAIN="@${lender}.com"
                                export E2E_LENDER_SUBDOMAIN="${lender}"
                                export E2E_TAGS="${params.E2E_TAGS}"
                                yarn e2e
                            """
                        } catch (Exception e) {
                            echo "Tests failed for lender: ${lender}"
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                }
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
