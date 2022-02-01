node{
    stage('checkout SCM'){
        git branch: 'master', url: 'https://github.com/Thakurking/node-arch-demo.git'
    }
    
    stage('docker compose build'){
        sh 'docker-compose build'
    }

    stage('docker compose up'){
        sh 'docker-compose up'
    }
}