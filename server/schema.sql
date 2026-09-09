-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT,
    "phone" TEXT,
    "roleId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "fullName" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "state" TEXT,
    "district" TEXT,
    "city" TEXT,
    "pincode" TEXT,
    "annualIncome" DOUBLE PRECISION,
    "occupation" TEXT,
    "education" TEXT,
    "employmentStatus" TEXT,
    "studentStatus" TEXT,
    "farmerStatus" TEXT,
    "businessOwner" BOOLEAN,
    "businessType" TEXT,
    "socialCategory" TEXT,
    "disabilityStatus" TEXT,
    "minorityStatus" TEXT,
    "maritalStatus" TEXT,
    "familySize" INTEGER,
    "residenceType" TEXT,
    "preferredLanguage" TEXT DEFAULT 'en',
    "additionalAttributes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheme" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "schemeCode" TEXT,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "objectives" TEXT,
    "ministry" TEXT,
    "department" TEXT,
    "implementingAgency" TEXT,
    "governmentLevel" TEXT,
    "schemeType" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "verificationStatus" TEXT NOT NULL DEFAULT 'UNVERIFIED',
    "officialUrl" TEXT,
    "applicationUrl" TEXT,
    "sourceUrl" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "lastVerifiedAt" TIMESTAMP(3),
    "sourceLastUpdatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeCategory" (
    "schemeId" UUID NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "SchemeCategory_pkey" PRIMARY KEY ("schemeId","categoryId")
);

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeTranslation" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "languageCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT,
    "description" TEXT,
    "objectives" TEXT,
    "benefitsText" TEXT,
    "eligibilityText" TEXT,
    "applicationText" TEXT,
    "documentsText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchemeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Benefit" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "benefitType" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION,
    "currency" TEXT DEFAULT 'INR',
    "frequency" TEXT,
    "conditions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BenefitTranslation" (
    "id" TEXT NOT NULL,
    "benefitId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "conditions" TEXT,

    CONSTRAINT "BenefitTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "documentType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentTranslation" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "DocumentTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeDocument" (
    "schemeId" UUID NOT NULL,
    "documentId" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "condition" TEXT,
    "notes" TEXT,

    CONSTRAINT "SchemeDocument_pkey" PRIMARY KEY ("schemeId","documentId")
);

-- CreateTable
CREATE TABLE "EligibilityRule" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "ruleGroupId" TEXT,
    "field" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "dataType" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EligibilityRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuleGroup" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "parentGroupId" TEXT,
    "logicOperator" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,

    CONSTRAINT "RuleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeKeyword" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "keyword" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL DEFAULT 'en',
    "source" TEXT NOT NULL DEFAULT 'MANUAL',

    CONSTRAINT "SchemeKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeEmbedding" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "contentHash" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "embedding" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchemeEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "state" TEXT,
    "district" TEXT,
    "city" TEXT,
    "pincode" TEXT,
    "locationType" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeLocation" (
    "schemeId" UUID NOT NULL,
    "locationId" TEXT NOT NULL,
    "locationScope" TEXT NOT NULL,

    CONSTRAINT "SchemeLocation_pkey" PRIMARY KEY ("schemeId","locationId")
);

-- CreateTable
CREATE TABLE "ApplicationMethod" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ApplicationMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeApplicationMethod" (
    "schemeId" UUID NOT NULL,
    "applicationMethodId" TEXT NOT NULL,

    CONSTRAINT "SchemeApplicationMethod_pkey" PRIMARY KEY ("schemeId","applicationMethodId")
);

-- CreateTable
CREATE TABLE "ApplicationStep" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "stepNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ApplicationStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationStepTranslation" (
    "id" TEXT NOT NULL,
    "applicationStepId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ApplicationStepTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeFaq" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SchemeFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqTranslation" (
    "id" TEXT NOT NULL,
    "faqId" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FaqTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeSource" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "sourceType" TEXT NOT NULL,
    "sourceIdentifier" TEXT,
    "retrievedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastCheckedAt" TIMESTAMP(3),
    "contentHash" TEXT,
    "isOfficial" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,

    CONSTRAINT "SchemeSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeVersion" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "changeSummary" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchemeVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SchemeVerification" (
    "id" TEXT NOT NULL,
    "schemeId" UUID NOT NULL,
    "verificationStatus" TEXT NOT NULL,
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "sourceChecked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchemeVerification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedScheme" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "schemeId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedScheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuery" (
    "id" TEXT NOT NULL,
    "userId" UUID,
    "query" TEXT NOT NULL,
    "languageCode" TEXT NOT NULL DEFAULT 'en',
    "intent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserQuery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchResult" (
    "id" TEXT NOT NULL,
    "userId" UUID,
    "schemeId" UUID NOT NULL,
    "matchScore" DOUBLE PRECISION NOT NULL,
    "eligibilityStatus" TEXT NOT NULL,
    "matchedCriteria" JSONB NOT NULL,
    "failedCriteria" JSONB NOT NULL,
    "missingInformation" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" UUID,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "oldData" JSONB,
    "newData" JSONB,
    "ipHashOrSafeIdentifier" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSetting" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Scheme_slug_key" ON "Scheme"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Scheme_schemeCode_key" ON "Scheme"("schemeCode");

-- CreateIndex
CREATE INDEX "Scheme_slug_idx" ON "Scheme"("slug");

-- CreateIndex
CREATE INDEX "Scheme_status_idx" ON "Scheme"("status");

-- CreateIndex
CREATE INDEX "Scheme_governmentLevel_idx" ON "Scheme"("governmentLevel");

-- CreateIndex
CREATE INDEX "Scheme_ministry_idx" ON "Scheme"("ministry");

-- CreateIndex
CREATE INDEX "Scheme_department_idx" ON "Scheme"("department");

-- CreateIndex
CREATE INDEX "Scheme_lastVerifiedAt_idx" ON "Scheme"("lastVerifiedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "SchemeCategory_schemeId_idx" ON "SchemeCategory"("schemeId");

-- CreateIndex
CREATE INDEX "SchemeCategory_categoryId_idx" ON "SchemeCategory"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_languageCode_key" ON "CategoryTranslation"("categoryId", "languageCode");

-- CreateIndex
CREATE INDEX "SchemeTranslation_languageCode_idx" ON "SchemeTranslation"("languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "SchemeTranslation_schemeId_languageCode_key" ON "SchemeTranslation"("schemeId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "BenefitTranslation_benefitId_languageCode_key" ON "BenefitTranslation"("benefitId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentTranslation_documentId_languageCode_key" ON "DocumentTranslation"("documentId", "languageCode");

-- CreateIndex
CREATE INDEX "EligibilityRule_schemeId_idx" ON "EligibilityRule"("schemeId");

-- CreateIndex
CREATE INDEX "EligibilityRule_field_idx" ON "EligibilityRule"("field");

-- CreateIndex
CREATE INDEX "SchemeKeyword_keyword_idx" ON "SchemeKeyword"("keyword");

-- CreateIndex
CREATE INDEX "SchemeKeyword_languageCode_idx" ON "SchemeKeyword"("languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "SchemeEmbedding_schemeId_key" ON "SchemeEmbedding"("schemeId");

-- CreateIndex
CREATE INDEX "SchemeLocation_schemeId_idx" ON "SchemeLocation"("schemeId");

-- CreateIndex
CREATE INDEX "SchemeLocation_locationId_idx" ON "SchemeLocation"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationMethod_name_key" ON "ApplicationMethod"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationStepTranslation_applicationStepId_languageCode_key" ON "ApplicationStepTranslation"("applicationStepId", "languageCode");

-- CreateIndex
CREATE UNIQUE INDEX "FaqTranslation_faqId_languageCode_key" ON "FaqTranslation"("faqId", "languageCode");

-- CreateIndex
CREATE INDEX "SchemeSource_sourceName_idx" ON "SchemeSource"("sourceName");

-- CreateIndex
CREATE INDEX "SchemeSource_sourceUrl_idx" ON "SchemeSource"("sourceUrl");

-- CreateIndex
CREATE INDEX "SavedScheme_userId_idx" ON "SavedScheme"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedScheme_userId_schemeId_key" ON "SavedScheme"("userId", "schemeId");

-- CreateIndex
CREATE INDEX "UserQuery_userId_idx" ON "UserQuery"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeCategory" ADD CONSTRAINT "SchemeCategory_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeCategory" ADD CONSTRAINT "SchemeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeTranslation" ADD CONSTRAINT "SchemeTranslation_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Benefit" ADD CONSTRAINT "Benefit_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BenefitTranslation" ADD CONSTRAINT "BenefitTranslation_benefitId_fkey" FOREIGN KEY ("benefitId") REFERENCES "Benefit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentTranslation" ADD CONSTRAINT "DocumentTranslation_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeDocument" ADD CONSTRAINT "SchemeDocument_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeDocument" ADD CONSTRAINT "SchemeDocument_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityRule" ADD CONSTRAINT "EligibilityRule_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityRule" ADD CONSTRAINT "EligibilityRule_ruleGroupId_fkey" FOREIGN KEY ("ruleGroupId") REFERENCES "RuleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleGroup" ADD CONSTRAINT "RuleGroup_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuleGroup" ADD CONSTRAINT "RuleGroup_parentGroupId_fkey" FOREIGN KEY ("parentGroupId") REFERENCES "RuleGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeKeyword" ADD CONSTRAINT "SchemeKeyword_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeLocation" ADD CONSTRAINT "SchemeLocation_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeLocation" ADD CONSTRAINT "SchemeLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeApplicationMethod" ADD CONSTRAINT "SchemeApplicationMethod_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeApplicationMethod" ADD CONSTRAINT "SchemeApplicationMethod_applicationMethodId_fkey" FOREIGN KEY ("applicationMethodId") REFERENCES "ApplicationMethod"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationStep" ADD CONSTRAINT "ApplicationStep_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationStepTranslation" ADD CONSTRAINT "ApplicationStepTranslation_applicationStepId_fkey" FOREIGN KEY ("applicationStepId") REFERENCES "ApplicationStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeFaq" ADD CONSTRAINT "SchemeFaq_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FaqTranslation" ADD CONSTRAINT "FaqTranslation_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "SchemeFaq"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeSource" ADD CONSTRAINT "SchemeSource_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeVersion" ADD CONSTRAINT "SchemeVersion_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeVerification" ADD CONSTRAINT "SchemeVerification_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedScheme" ADD CONSTRAINT "SavedScheme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedScheme" ADD CONSTRAINT "SavedScheme_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuery" ADD CONSTRAINT "UserQuery_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

