import { DocumentData } from "firebase/firestore";
import { FirestoreControl } from "../../../utils/firestoreControl";
import { T_activity } from "../../../types/dashboard-types";
import { getActivity } from "../../../constants/dashboard-constants";

export class RecentActivity {
  private static userActivityContainer = <HTMLDivElement>(
    document.getElementById("user-activity-container")
  );

  private static async getRecentActivity(userID: string) {
    try {
      if (!userID) {
        throw new Error("No user ID found");
      }

      const activityOperation = new FirestoreControl("users", userID);
      const userRecentActivity: DocumentData | null =
        await activityOperation.getDocument();

      return (userRecentActivity as DocumentData)?.activity || [];
    } catch (error) {
      console.error("Something Went Wrong: ", error);
      return [];
    }
  }

  public static async insertActivities(userID: string) {
    const recentActivity: T_activity[] | [] = await this.getRecentActivity(
      userID
    );
    const loading = <HTMLImageElement>(
      document.querySelector("#user-activity-container img")
    );
    const noActivity = <HTMLDivElement>(
      document.getElementById("no-recent-activity")
    );
    if (recentActivity && recentActivity.length > 0) {
      if (loading) loading.classList.add("hidden");
      recentActivity.slice(-3).forEach(async (activity: T_activity) => {
        const activityElement = await getActivity(activity);
        this.userActivityContainer.innerHTML += activityElement;
      });
    } else {
      if (loading && noActivity) {
        loading.classList.add("hidden");
        noActivity.classList.remove("hidden");
      }
    }
  }
}
