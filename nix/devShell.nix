{
  mkShell,
  alejandra,
  bash,
  nodejs_23,
}:
mkShell rec {
  name = "peerfect";

  packages = [
    bash
    nodejs_23

    # just in case we do CI
    alejandra
  ];
}
