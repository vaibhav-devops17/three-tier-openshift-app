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

Verify:

```id="mongo-check"
oc get pods
oc get pvc
oc get svc
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

Get URL:

```id="route-get"
oc get route
```

---

# 🧪 Step 7: Test Application

1. Open route URL in browser
2. Add data using UI

Verify data in MongoDB:

```id="mongo-test"
oc rsh <mongo-pod>
mongo
use test
db.items.find()
```

---

# 📸 Screenshots

* Frontend Application UI
<img width="716" height="389" alt="{D08AFDBF-C038-494A-9BBD-74D33D1AD3CF}" src="https://github.com/user-attachments/assets/583e8fbc-c25f-416c-a818-d988722dea80" />

* Backend Application UI (Frontend_route_URL + /api)
<img width="266" height="297" alt="{FD437C2D-5935-4B30-9993-7DB7CFF00553}" src="https://github.com/user-attachments/assets/a6ef093a-851d-4989-bf75-7d6a987779c2" />


* OpenShift Pods
* CI/CD Pipeline

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
