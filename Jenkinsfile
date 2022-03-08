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
                sshagent(['vultr-ssh-key']) {
                    sh 'ssh -o StrictHostKeyChecking=no root@45.76.148.121 "echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin docker pull ridwan779/ip-location docker logout exit"'
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