# Stingr Infrastructure as Code (IaC) – CloudFormation Stack

This directory contains the CloudFormation template and deployment instructions for provisioning backend infrastructure for the **Stingr** application using AWS CloudFormation.

---

## 📦 Resources Defined

The `stingr-stack.yml` CloudFormation template provisions the following:

### 1. **S3 Bucket**
- **Name**: `stingr-bucket-cf`
- **Purpose**: Stores and serves artist assets/media for the Stingr app.
- **Public Access**: Enabled — for serving assets to a public website.
- **Static Website Hosting**: Configured with `index.html` only (no `error.html` at this time).
- **Future Options**: Bucket versioning and logging can be added later.

### 2. **Bucket Policy**
- Grants public `s3:GetObject` access so that content can be accessed via the web.

### 3. **IAM Roles/Policies**
- IAM permissions are required for CloudFormation to manage stack resources.
- Uses `CAPABILITY_NAMED_IAM` to allow creation of IAM roles and policies.

---

## 🚀 Stack Deployment

To deploy the stack using the AWS CLI:

```bash
aws Cloud-Formation-Policy deploy \
  --template-file stingr-stack.yml \
  --stack-name stingr-assets-stack \
  --capabilities CAPABILITY_NAMED_IAM
