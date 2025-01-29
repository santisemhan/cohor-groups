FROM public.ecr.aws/lambda/nodejs:20 AS base
 
FROM base AS builder

WORKDIR /app

RUN npm install -g turbo@^2.3.4
COPY . .
 
RUN turbo prune @cohor/backend --docker

FROM base AS installer
WORKDIR /app

COPY --from=builder /app/out/json/ .
RUN npm install --frozen-lockfile
 
COPY --from=builder /app/out/full/ .
RUN npm run build
 
FROM base AS runner
WORKDIR /app

WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=installer /app/apps/backend/.build ./
COPY --from=installer /app/node_modules ./node_modules

CMD [ "lambda_function.lambda_handler" ]