/* ========= Subsystems ========= */
class Lights {
  on(): void {
    console.log("Home lights are ON.");
  }

  off(): void {
    console.log("Home lights are OFF.");
  }

  dim(level: number): void {
    console.log(`Home lights dimmed to ${level}%.`);
  }
}
class AirConditioner {
  on(): void {
    console.log("Air Conditioner is ON.");
  }

  off(): void {
    console.log("Air Conditioner is OFF.");
  }

  setTemperature(temperature: number): void {
    console.log(`Air Conditioner temperature set to ${temperature}°C.`);
  }
}
class SecurityCamera {
  activate(): void {
    console.log("Security cameras activated.");
  }

  deactivate(): void {
    console.log("Security cameras deactivated.");
  }
}
class SmartDoorLock {
  lock(): void {
    console.log("Doors are locked.");
  }

  unlock(): void {
    console.log("Doors are unlocked.");
  }
}

/* ========= Facade ========= */
class SmartHomeFacade {
  constructor(
    private lights: Lights,
    private airConditioner: AirConditioner,
    private securityCamera: SecurityCamera,
    private smartDoorLock: SmartDoorLock,
  ) {}

  arriveHome(): void {
    console.log("Arriving home...");

    this.smartDoorLock.unlock();
    this.securityCamera.deactivate();
    this.lights.on();
    this.airConditioner.on();
    this.airConditioner.setTemperature(23);

    console.log("Welcome home!");
  }

  leaveHome(): void {
    console.log("Leaving home...");

    this.lights.off();
    this.airConditioner.off();
    this.smartDoorLock.lock();
    this.securityCamera.activate();

    console.log("Home secured. Goodbye!");
  }

  nightMode(): void {
    console.log("Activating night mode...");

    this.lights.dim(15);
    this.smartDoorLock.lock();
    this.securityCamera.activate();
    this.airConditioner.on();
    this.airConditioner.setTemperature(24);

    console.log("Night mode is active.");
  }
}

/* ========= run  ========= */
function main(): void {
  const facade = new SmartHomeFacade(
    new Lights(),
    new AirConditioner(),
    new SecurityCamera(),
    new SmartDoorLock(),
  );

  facade.arriveHome();
  console.log("---------------------------");
  facade.nightMode();
  console.log("---------------------------");
  facade.leaveHome();
}

main();
