{
  mkShell,
  alejandra,
  bash,
  nodejs_22,
}:
mkShell rec {
  name = "peerfect";

  packages = [
    bash
    nodejs_22

    # just in case we do CI
    alejandra
  ];
}
