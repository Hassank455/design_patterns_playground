/* ========= Subsystems ========= */
class TV {
  on(): void {
    console.log("TV is now ON.");
  }

  off(): void {
    console.log("TV is now OFF.");
  }

  setInput(source: string): void {
    console.log(`TV input set to ${source}.`);
  }
}

class SoundSystem {
  on(): void {
    console.log("Sound System is now ON.");
  }

  off(): void {
    console.log("Sound System is now OFF.");
  }

  setVolume(level: number): void {
    console.log(`Sound volume set to ${level}.`);
  }
}
class DvdPlayer {
  on(): void {
    console.log("DVD Player is now ON.");
  }

  off(): void {
    console.log("DVD Player is now OFF.");
  }

  play(movie: string): void {
    console.log(`Playing movie: ${movie}`);
  }

  stop(): void {
    console.log("DVD Player stopped.");
  }
}
class Lights {
  dim(level: number): void {
    console.log(`Lights dimmed to ${level}%.`);
  }

  on(): void {
    console.log("Lights are ON.");
  }
}

/* ========= Facade ========= */
class HomeTheaterFacade {
  constructor(
    private tv: TV,
    private soundSystem: SoundSystem,
    private dvdPlayer: DvdPlayer,
    private lights: Lights,
  ) {}

  watchMovie(movie: string): void {
    console.log("Starting movie night...");

    this.lights.dim(20);
    this.tv.on();
    this.tv.setInput("DVD");
    this.soundSystem.on();
    this.soundSystem.setVolume(25);
    this.dvdPlayer.on();
    this.dvdPlayer.play(movie);

    console.log("Movie is ready. Enjoy!");
  }

  endMovie(): void {
    console.log("Shutting movie theater down...");

    this.dvdPlayer.stop();
    this.dvdPlayer.off();
    this.soundSystem.off();
    this.tv.off();
    this.lights.on();

    console.log("Movie night ended.");
  }
}

/* ========= run  ========= */
function main(): void {
  const facade = new HomeTheaterFacade(
    new TV(),
    new SoundSystem(),
    new DvdPlayer(),
    new Lights(),
  );

  facade.watchMovie("Inception");
  console.log("---------------------------");
  facade.endMovie();
}

main();
