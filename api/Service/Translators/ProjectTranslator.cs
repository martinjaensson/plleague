using Common;
using Service.Dto;
using Service.Entities;
using Service.Exceptions;
using System.IO;
using Vb;
using Visma.BusinessModel;

namespace Service.Translators
{
    public class ProjectTranslator
    {
        public static ProjectDto Translate(Project project, bool multipleOrders)
        {
            if (project == null)
                return null;
            if (!multipleOrders)
            {
                return new ProjectDto
                {
                    Id = project.OrgUnit2No,
                    Name = project.Name,
                    ProjectLeaderNo = project.ActorNo,
                    ProjectLeader = UserTranslator.Translate(project.ProjectLeader),
                    EndCustomerNo = project.AssociateNo1,
                    OEMNo = project.AssociateNo2,
                    AgentNo = project.AssociateNo3,
                    MemoFilePath = File.Exists(project.MemoFileName) ? project.MemoFileName : generateNewFilePath(project.OrgUnit2No),
                    Comment = readFromFileOrCreateNewIfMissing(project.MemoFileName, project.OrgUnit2No)
                };
            }
            else {
                return new ProjectDto
                {
                    Id = project.OrgUnit2No,
                    Name = project.Name,
                    ProjectLeaderNo = project.ActorNo,
                    ProjectLeader = UserTranslator.Translate(project.ProjectLeader),
                    //EndCustomerNo = project.AssociateNo1,
                    //OEMNo = project.AssociateNo2,
                    //AgentNo = project.AssociateNo3,
                    //MemoFilePath = File.Exists(project.MemoFileName) ? project.MemoFileName : generateNewFilePath(project.OrgUnit2No),
                    //Comment = readFromFileOrCreateNewIfMissing(project.MemoFileName, project.OrgUnit2No)
                };
            }
        }

        private static string readFromFileOrCreateNewIfMissing(string filePath, int id) {
            if (!File.Exists(filePath)) {
                var newFilePath = generateNewFilePath(id);
                writeFilePathToProject(newFilePath, id);
                File.Create(newFilePath).Close();
                return "";
            } else {
                return Utils.ReadWriteFile.ReadTxtFile(filePath);
            }
        }

        private static string generateNewFilePath(int id) {
            return Config.VbFilePath + "ProjectComment" + id + ".txt";
        }

        private static void writeFilePathToProject(string filePath, int id) {
            using (var vb = new VbClient())
            {
                var tableHandler = vb.Context.UseTable((long)T.OrgUnit2);

                var rowSelection = tableHandler.SelectRow();
                rowSelection.IntegerColumnValue((long)C.OrgUnit2.OrgUnit2No, id);

                var row = rowSelection.Row;
                row.SetStringValue((long)C.OrgUnit2.MemoFileName, filePath);

                var res = vb.Dispatch();

                if (!res.AllSucceeded)
                    throw new ErpException(vb.GetErrorMessage());
            }
        }

    }
}
