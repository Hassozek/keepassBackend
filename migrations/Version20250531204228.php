<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250531204228 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        // 1. Add owner_id as nullable first
        $this->addSql(<<<'SQL'
            ALTER TABLE folder ADD owner_id INT DEFAULT NULL
        SQL);
        // 2. Set all existing folders to have owner_id = 1
        $this->addSql(<<<'SQL'
            UPDATE folder SET owner_id = 1 WHERE owner_id IS NULL
        SQL);
        // 3. Alter column to NOT NULL
        $this->addSql(<<<'SQL'
            ALTER TABLE folder ALTER COLUMN owner_id SET NOT NULL
        SQL);
        // 4. Add foreign key and index
        $this->addSql(<<<'SQL'
            ALTER TABLE folder ADD CONSTRAINT FK_ECA209CD7E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_ECA209CD7E3C61F9 ON folder (owner_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE valut ADD email VARCHAR(255) NOT NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE valut DROP email
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE folder DROP CONSTRAINT FK_ECA209CD7E3C61F9
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_ECA209CD7E3C61F9
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE folder DROP owner_id
        SQL);
    }
}
