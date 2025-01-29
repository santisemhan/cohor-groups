# Cohor Backend

# Deploy to Production

1. En el root ejecutar npm run docker:backend:production
2. Ejecutar el comando aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 574175411698.dkr.ecr.us-east-1.amazonaws.com
3. Ejecutar el comando docker tag serverless-cohor-backend-production:latest 574175411698.dkr.ecr.us-east-1.amazonaws.com/serverless-cohor-backend-production:latest
4. Ejecutar el comando docker push 574175411698.dkr.ecr.us-east-1.amazonaws.com/serverless-cohor-backend-production:latest
5. Actualizar la uri en el serverless.yml
6. En el path del apps/backend ejecutar npm run deploy:production