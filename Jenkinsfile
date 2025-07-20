@Library('Shared') _

pipeline {
  agent {
    kubernetes {
      yaml '''
apiVersion: v1
kind: Pod
metadata:
  name: kaniko-pod
spec:
  containers:
    - name: jnlp
      image: skymonil/jenkins-slave-pod
    - name: kaniko
      image: gcr.io/kaniko-project/executor:debug
      command: ["/busybox/cat"]
      tty: true
      volumeMounts:
        - name: kaniko-secret
          mountPath: /kaniko/.docker
      resources:
        requests:
          cpu: "1"
          memory: "2Gi"
        limits:
          cpu: "2"
          memory: 3Gi
    - name: trivy
      image: aquasec/trivy:latest
      command: ["/bin/sh", "-c", "sleep infinity"]
      tty: true
      volumeMounts:
        - name: workspace-volume
          mountPath: /workspace
    - name: zap
      image: ghcr.io/zaproxy/zaproxy:stable
      tty: true
      volumeMounts:
        - name: workspace-volume
          mountPath: /zap/wrk
  volumes:
    - name: kaniko-secret
      secret:
        secretName: regcred
        items:
          - key: config.json
            path: config.json
    - name: workspace-volume
      emptyDir: {}
'''
    }
  }

  environment {
    REGISTRY = 'docker.io/skymonil'
    FRONTEND_IMAGE = "caam-frontend"
    BACKEND_IMAGE = "caam-backend"
    SCANNER_HOME = tool 'SonarScanner'
  }

  stages {
    stage("Workspace cleanup") {
      steps {
        cleanWs()
      }
    }

    stage('Git: Code Checkout') {
      steps {
        container('jnlp') {
          script {
            clone("https://github.com/skymonil/CAAM", "main")
          }
        }
      }
    }
    
    stage('Determine Changed Folders') {
      steps {
        container('jnlp') {
          script {
            def changedFiles = sh(
              script: 'git diff --name-only HEAD~1 HEAD',
              returnStdout: true
            ).trim().split('\n')

            def frontendChanged = changedFiles.any { it.startsWith('client/') }
            def backendChanged = changedFiles.any { it.startsWith('server/') }

            env.FRONTEND_CHANGED = frontendChanged.toString()
            env.BACKEND_CHANGED = backendChanged.toString()
          }
        }
      }
    }
    
    stage('Extract Git Commit Short') {
      steps {
        container('jnlp') {
          script {
            def shortCommit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
            env.GIT_COMMIT_SHORT = shortCommit
          }
        }
      }
    }
    
    stage('Security Scans') {
      parallel {
        stage('Snyk Dependency Scan') {
          steps {
            container('jnlp') {
              withCredentials([string(credentialsId: 'snyk-token', variable: 'SNYK_TOKEN')]) {
                sh '''
                  cd client && npm install --silent && cd ..
                  cd server && npm install --silent && cd ..
                  snyk auth $SNYK_TOKEN
                 snyk test --all-projects || true
                  snyk monitor --all-projects 
                '''
              }
            }
          }
        }
        
        stage('SonarQube Analysis') {
          steps {
            container('jnlp') {
              withSonarQubeEnv('SonarQubeServer') {
                sh "${SCANNER_HOME}/bin/sonar-scanner \
                  -Dsonar.projectKey=caam \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=http://192.168.29.245:9000 \
                  -Dsonar.verbose=true \
                  -Dsonar.login=36a42417ffad1897993dd7bb2869ff181921008c"
              }
            }
          }
        }
      }
    }

    stage('Build & Push') {
      parallel {
        stage('Frontend') {
          when {
            expression { return env.FRONTEND_CHANGED == 'true' }
          }
          stages {
            stage('Build Frontend') {
              steps {
                container('kaniko') {
                  sh """
                    /kaniko/executor \
                      --context `pwd`/client \
                      --dockerfile `pwd`/client/Dockerfile \
                      --destination ${REGISTRY}/${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} \
                      --destination ${REGISTRY}/${FRONTEND_IMAGE}:latest \
                      --cache-repo=192.168.29.244:8082/docker-cache \
                      --cache=true
                  """
                }
              }
            }
            stage('Scan Frontend') {
              steps {
                container('trivy') {
                  sh """
                    trivy image --no-progress ${REGISTRY}/${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT}
                  """
                }
              }
            }
          }
        }
        
        stage('Backend') {
          when {
            expression { return env.BACKEND_CHANGED == 'true' }
          }
          stages {
            stage('Build Backend') {
              steps {
                container('kaniko') {
                  sh """
                    /kaniko/executor \
                      --context `pwd`/server \
                      --dockerfile `pwd`/server/Dockerfile \
                      --destination ${REGISTRY}/${BACKEND_IMAGE}:${GIT_COMMIT_SHORT} \
                      --destination ${REGISTRY}/${BACKEND_IMAGE}:latest \
                      --cache-repo=192.168.29.244:8082/docker-cache \
                      --cache=true
                  """
                }
              }
            }
            stage('Scan Backend') {
              steps {
                container('trivy') {
                  sh """
                    trivy image --no-progress ${REGISTRY}/${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}
                  """
                }
              }
            }
          }
        }
      }
    }
       stage('DAST Scan') {
  steps {
    container('zap') {
        script {
            sh ''' echo "ngrok-skip-browser-warning:true" > headers.txt '''
       sh '''
            zap-baseline.py -t https://8382-2405-201-4f-a9e3-a00-27ff-fe74-14e0.ngrok-free.app/ \
            -r zap-report.html || true \
             -z "http.header=ngrok-skip-browser-warning: 1" || true

        '''
        }
     
    }
  }
} 
  }

 
  post {
    always {
         

      emailext (
        subject: "Build ${currentBuild.currentResult}: CAAM CI - Commit ${env.GIT_COMMIT_SHORT}",
        body: """\
          <p>Hi Team,</p>
          <p>The Jenkins pipeline has completed with status: <b>${currentBuild.currentResult}</b>.</p>
          <p><b>Commit:</b> ${env.GIT_COMMIT_SHORT}</p>
          <p>Project: CAAM</p>
          <p>Build URL: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
          <br>
          <p>Regards,<br>Jenkins</p>
        """,
        mimeType: 'text/html',
        to: 'monilparikh11@gmail.com'
      )
    }
    failure {
      slackSend(
        channel: '#build-alerts',
        message: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nCommit: ${env.GIT_COMMIT_SHORT}\nURL: ${env.BUILD_URL}"
      )
      emailext (
      subject: "❌ FAILURE: CAAM Build - Commit ${env.GIT_COMMIT_SHORT}",
      body: """\
        <p>Hi Team,</p>
        <p>The Jenkins pipeline has <b>failed</b> for the following commit:</p>
        <ul>
          <li><b>Commit:</b> ${env.GIT_COMMIT_SHORT}</li>
          <li><b>Job:</b> ${env.JOB_NAME}</li>
          <li><b>Build #:</b> ${env.BUILD_NUMBER}</li>
        </ul>
        <p>Build logs and details: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
        <br>
        <p>Please review and take necessary action.</p>
        <p>Regards,<br>Jenkins</p>
      """,
      mimeType: 'text/html',
      to: 'monilparikh11@gmail.com'
    )
    }
    success {
      // Additional success actions if needed
       emailext (
      subject: "✅ SUCCESS: CAAM Build - Commit ${env.GIT_COMMIT_SHORT}",
      body: """\
        <p>Hi Team,</p>
        <p>The Jenkins pipeline has <b>successfully completed</b> for:</p>
        <ul>
          <li><b>Commit:</b> ${env.GIT_COMMIT_SHORT}</li>
          <li><b>Job:</b> ${env.JOB_NAME}</li>
          <li><b>Build #:</b> ${env.BUILD_NUMBER}</li>
        </ul>
        <p>View the build: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
        <br>
        <p>Regards,<br>Jenkins</p>
      """,
      mimeType: 'text/html',
      to: 'monilparikh11@gmail.com'
    )
    }
  }
}
