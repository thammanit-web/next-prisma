/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [Post_authorId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Post] DROP CONSTRAINT [Post_published_df];
ALTER TABLE [dbo].[Post] ALTER COLUMN [content] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Post] DROP COLUMN [authorId];
ALTER TABLE [dbo].[Post] ADD [userId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [name] NVARCHAR(1000) NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Post] ADD CONSTRAINT [Post_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
