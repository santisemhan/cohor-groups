-- AddForeignKey
ALTER TABLE "MailRateLimit" ADD CONSTRAINT "MailRateLimit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
