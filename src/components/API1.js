import { create } from "apisauce";
const apiClient = create({
  baseURL:
    "http://p4.maktabsoft.ir/7070/db_android.php?active_user=3C962B18005BC3C449A0297608F48C52&app_version=12.3.19&status=get_list_channel",
});

export default apiClient;
