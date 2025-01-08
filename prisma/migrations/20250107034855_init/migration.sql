/*
  Warnings:

  - You are about to drop the column `updateUT` on the `User` table. All the data in the column will be lost.
  - Added the required column `updateUt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [updateUT];
ALTER TABLE [dbo].[User] ADD [updateUt] DATETIME2 NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
