export default class Logger {
  public static d(data: any) {
    Logger.separator()
    console.log(data);
  }

  public static separator() {
    console.log("*".repeat(80))
  }
}