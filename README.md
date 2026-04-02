# 🚀 3-Tier Application on OpenShift

This project demonstrates a **production-ready 3-tier application** deployed on OpenShift using:

* Frontend (Nginx + Modern UI)
* Backend (Node.js + Express)
* MongoDB (with Persistent Volume)
* CI/CD using GitHub Actions
* OpenShift native resources (Secrets, Route, Deployment)

---

# 🧱 Architecture

```id="arch"
User → OpenShift Route → Frontend (Nginx)
                              ↓ /api
                           Backend (Node.js)
                              ↓
                           MongoDB (PVC)
```

---

# 🛠️ Prerequisites

## 1. Docker

Download: https://www.docker.com/products/docker-desktop/

Verify:

```id="docker"
docker --version
```

---

## 2. OpenShift CLI (oc)

Download:
https://mirror.openshift.com/pub/openshift-v4/clients/oc/latest/

Verify:

```id="oc"
oc version
```

---

## 3. Git

Download:
https://git-scm.com/downloads

Verify:

```id="git"
git --version
```

# 🔐 CI/CD & Secrets Setup

This project uses **GitHub Actions + OpenShift + DockerHub** for automated deployment.

---

## 🐳 1: Create DockerHub Access Token

1. Go to DockerHub → Account Settings
2. Navigate to **Security → Access Tokens**
3. Click **Generate New Token**
4. Copy:

   * Username
   * Token (Password)

---

## 🔐 2: Add GitHub Secrets

Go to your GitHub repository:

👉 Settings → Secrets and Variables → Actions → New Repository Secret

Add the following:

| Name             | Value                   |
| ---------------- | ----------------------- |
| DOCKER_USERNAME  | Your DockerHub username |
| DOCKER_PASSWORD  | DockerHub access token  |
| OPENSHIFT_TOKEN  | OpenShift login token   |
| OPENSHIFT_SERVER | OpenShift API URL       |

---

## 🔑 3: Get OpenShift Token & Server

Login to OpenShift Web Console:

1. Click your profile (top right)
2. Click **Copy Login Command**
3. Copy:

```id="token"
oc login --token=xxxx --server=https://api....
```

Extract:

* OPENSHIFT_TOKEN = `xxxx`
* OPENSHIFT_SERVER = `https://api....`

---

---

# 📦 Clone Repository

```id="clone"
git clone https://github.com/vaibhav-devops17/three-tier-openshift-app.git
cd three-tier-openshift-app
```

---

# 🔐 Step 1: Login to OpenShift

Copy login command from OpenShift Web Console:

```id="login"
oc login --token=<your-token> --server=<cluster-url>
```

Select your project:

```id="project"
oc project <your-project-name>
```

---

# 🔐 Step 2: Create Secrets

⚠️ Do NOT store credentials in GitHub

```id="secret"
oc create secret generic mongo-secret \
  --from-literal=MONGO_USER=admin \
  --from-literal=MONGO_PASSWORD=password
```

---

# 💾 Step 3: Deploy MongoDB (with PVC)

```id="mongo"
oc apply -f Openshift/pvc.yml
oc apply -f Openshift/mongo.yml
oc apply -f Openshift/mongo-service.yml
```

---

# ⚙️ Step 4: Deploy Backend

```id="backend"
oc apply -f Openshift/backend.yml
oc apply -f Openshift/backend-service.yml
```

---

# 🌐 Step 5: Deploy Frontend

```id="frontend"
oc apply -f Openshift/frontend.yml
oc apply -f Openshift/frontend-service.yml
```

---

# 🌍 Step 6: Expose Application

```id="route"
oc apply -f Openshift/route.yml
```

# Verify:

```id="mongo-check"
oc get pods
oc get pvc
oc get svc
```
<img width="949" height="311" alt="image" src="https://github.com/user-attachments/assets/e4a4b0a9-cb3a-4dfb-ba3a-fd4502899535" />

## Get URL:

```id="route-get"
oc get route
```
<img width="914" height="90" alt="image" src="https://github.com/user-attachments/assets/22651038-b55e-44c8-86e8-4592f2bb7fb2" />


---

# 🧪 Step 7: Test Application

* Open route URL in browser
    https://frontend-route-vsarode000-dev.apps.rm1.0a51.p1.openshiftapps.com/

## Frontend Application UI
  
<img width="716" height="389" alt="{D08AFDBF-C038-494A-9BBD-74D33D1AD3CF}" src="https://github.com/user-attachments/assets/583e8fbc-c25f-416c-a818-d988722dea80" />

## Add data using UI

## Verify data in backend URL:

* Add **/api** after the Frontend URL
  
    https://frontend-route-vsarode000-dev.apps.rm1.0a51.p1.openshiftapps.com/api

## Backend Application UI (Frontend_route_URL + /api)
  
<img width="266" height="297" alt="{FD437C2D-5935-4B30-9993-7DB7CFF00553}" src="https://github.com/user-attachments/assets/a6ef093a-851d-4989-bf75-7d6a987779c2" />

* Verify data in MongoDB:

```id="mongo-test"
oc rsh <mongo-pod>
mongo
use test
db.items.find()
```
<img width="466" height="183" alt="image" src="https://github.com/user-attachments/assets/bf439afe-2d6d-4af4-a879-f56835d318c0" />

---

# 📸 Screenshots


## OpenShift Deployment

<img width="748" height="311" alt="{B29698B6-F86F-4DFB-BC37-DA23556C4C8F}" src="https://github.com/user-attachments/assets/810fefcd-99ec-4c46-bd79-1a8c2a097663" />


## OpenShift Persistant Volume Claim

<img width="788" height="203" alt="{BDB280CA-AC6C-4195-A742-3F269C1FA706}" src="https://github.com/user-attachments/assets/1ce10165-9796-4fa8-8610-66d83fabb225" />

  
## OpenShift Service

<img width="767" height="271" alt="{D553891A-18BA-45F5-AADF-02AFB9EEBCA0}" src="https://github.com/user-attachments/assets/c1a7951b-b3c2-4a2a-9d6b-a21ff1cf4b31" />


## OpenShift Routes

<img width="788" height="189" alt="{D2E1D620-3CA8-41B7-BFA4-D37DC76F7F0D}" src="https://github.com/user-attachments/assets/20540d95-d13f-43f9-808c-8efc70e55a09" />


## OpenShift Secrets

<img width="783" height="243" alt="{5241FCF4-D0C9-40DF-B008-48F383ADFA9F}" src="https://github.com/user-attachments/assets/f9285460-c782-4981-bc26-c0378b8d2a3a" />

<img width="788" height="234" alt="{8F7C8BEF-13AC-48AE-9012-EEAF2A1D6531}" src="https://github.com/user-attachments/assets/cb8253a2-5e02-457c-9cdf-9ca5497c4ba2" />



## CI/CD Pipeline

<img width="960" height="368" alt="{DE339286-694E-4ADF-8E14-21A82B697E3F}" src="https://github.com/user-attachments/assets/6d83c8ba-7298-4cdb-b3e9-3977f0c907c0" />


---

# 🔁 CI/CD Pipeline

GitHub Actions automatically:

* Builds Docker images
* Pushes to DockerHub
* Updates OpenShift deployments

Trigger pipeline:

```id="ci"
git push
```

---


# 🔍 Monitoring & Debugging

## Logs

```id="logs"
oc logs -f deployment/backend-dev
```

---

## Pods

```id="pods"
oc get pods
```

---

## Resource Usage

```id="top"
oc adm top pods
```

---

# ❤️ Health Check

Backend exposes:

```id="health"
GET /health
```

Used by OpenShift liveness and readiness probes.

---

# 🔁 Rollback

```id="rollback"
oc rollout undo deployment/backend-dev
```

---

# 🔵🟢 Blue-Green Deployment (Concept)

1. Deploy new version (green)
2. Update service selector
3. Switch traffic

---

# 💾 PVC Verification

1. Insert data
2. Delete Mongo pod
3. Check data again

If data persists → PVC working ✔

---

# 🔐 Security Best Practices

* Use OpenShift Secrets
* Avoid hardcoding credentials
* Use versioned Docker images
* Enable TLS for routes

---

# 🚀 Future Improvements

* HPA (Auto Scaling)
* Prometheus + Grafana Monitoring
* Helm Charts
* MongoDB Replica Set

---

# 🧠 Learning Outcomes

* OpenShift deployment
* CI/CD automation
* Persistent storage handling
* Debugging real-world issues
* Production best practices

---

# 👨‍💻 Author

Vaibhav Sarode
Senior DevOps Engineer
