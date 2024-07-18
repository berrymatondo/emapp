-- AlterTable
ALTER TABLE "waiters" ADD COLUMN     "eventId" INTEGER;

-- AddForeignKey
ALTER TABLE "waiters" ADD CONSTRAINT "waiters_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;
