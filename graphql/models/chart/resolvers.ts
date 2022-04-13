import prisma from 'config/prisma';

const ChartResolvers = {
  Query: {
    getChartData: async (parent, args) => {
      const admissionProcessesList = [];
      const numberOfPendingDocumentsPerAdmissionProcess = [];

      const admissionProcesses = await prisma.admissionProcess.findMany({
        where: {
          status: 'Hiring_Phase',
        },
        include: {
          candidate: true,
        },
      });
      for (const admissionProcess of admissionProcesses) {
        const { vacancyId, id, candidate } = admissionProcess;
        const { email } = candidate;

        const vacancy = await prisma.vacancy.findUnique({
          where: {
            id: vacancyId,
          },
          include: {
            documents: true,
          },
        });
        const vacancyName = vacancy.position;
        const admissionProcessCategory = `${vacancyName} - ${email}`;
        admissionProcessesList.push(admissionProcessCategory);
        const numberOfVacancyDocuments = vacancy.documents.length;
        const uploadedDocuments = await prisma.uploadedDocument.findMany({
          where: {
            admissionProcessId: id,
          },
        });
        const numberOfUploadedDocuments = uploadedDocuments.length;
        const numberOfPendingDocuments =
          numberOfVacancyDocuments - numberOfUploadedDocuments;
        numberOfPendingDocumentsPerAdmissionProcess.push(
          numberOfPendingDocuments
        );
      }
      return {
        series: [
          {
            data: numberOfPendingDocumentsPerAdmissionProcess,
          },
        ],
        categories: admissionProcessesList,
      };
    },
  },
};
export { ChartResolvers };
