import { create } from "apisauce";

const archiveAPI = create({
  baseURL:
    "http://p4.maktabsoft.ir/7070/db_android.php?status=get_session_archive&app_version=12.3.19&active_user=3C962B18005BC3C449A0297608F48C52",
});


export default archiveAPI;
