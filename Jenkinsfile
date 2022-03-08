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
                    sh "ssh -o StrictHostKeyChecking=no root@45.76.148.121 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin && docker pull ridwan779/ip-location && exit'"
                    // sh "ssh -o StrictHostKeyChecking=no root@45.76.148.121 'docker ps -a | grep 'ip-location' && docker stop ip-location && exit'"
                    // sh "ssh -o StrictHostKeyChecking=no root@45.76.148.121 'docker ps -a | grep 'ip-location' && docker rm ip-location && exit'"
                    sh "ssh -o StrictHostKeyChecking=no root@45.76.148.121 'docker run --rm --name ip-location -p 8881:8024 -d ridwan779/ip-location && exit'"
                    
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