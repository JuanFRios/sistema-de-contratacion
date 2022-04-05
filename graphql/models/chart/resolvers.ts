import prisma from 'config/prisma';

const ChartResolvers = {
  Query: {
    getChartData: async (parent, args) => {
      let admissionProcessesList = [];
      let numberOfPendingDocumentsPerAdmissionProcess = [];

      const admissionProcesses = await prisma.admissionProcess.findMany({
        where: {
          status: 'Hiring_Phase'
        },
        include: {
          candidate: true
        }
      });     
      for (let admissionProcess of admissionProcesses) {
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
        let vacancyName = vacancy.position;
        let admissionProcessCategory = `${vacancyName} - ${email}`;
        admissionProcessesList.push(admissionProcessCategory);
        let numberOfVacancyDocuments = vacancy.documents.length;
        const uploadedDocuments = await prisma.uploadedDocument.findMany({
          where: {
            admissionProcessId: id
          },
        });
        let numberOfUploadedDocuments = uploadedDocuments.length;
        let numberOfPendingDocuments = numberOfVacancyDocuments - numberOfUploadedDocuments;
        numberOfPendingDocumentsPerAdmissionProcess.push(numberOfPendingDocuments);
      }
      return {
        series: [{
          data: numberOfPendingDocumentsPerAdmissionProcess
        }],
        categories: admissionProcessesList,
      };
    },
  },
};
export { ChartResolvers };
