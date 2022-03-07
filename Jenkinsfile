pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS=credentials('docker-ridwan779')
    }

    stages {

        stage("Git") {

            steps {
                git branch: 'master', credentialsId: '1ed4edcf-1fdc-4de2-b7db-1cb32017607e', url: 'git@github.com:ridwan779/ip-location.git';
                sh "chmod +x -R '${env.WORKSPACE}'";
            }

        }

        stage("Build") {
            steps {
                sh 'docker build -t ridwan779/ip-location:latest .';
            }
        }

        stage("Login") {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage("Push") {
            steps {
                sh 'docker push ridwan779/ip-location:latest'
            }
        }

        stage("Deploy") {
            steps {
                sshagent(credentials: ['vultr-ssh-key']) {
                    sh '''
                        [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                        ssh-keyscan -t rsa,dsa 45.76.148.121 >> ~/.ssh/known_hosts
                        ssh root@45.76.148.121 ...
                    '''
                }
            }
        }

    }

    post {
        always {
            sh 'docker logout';
        }
    }
}