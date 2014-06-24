# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "phusion-open-ubuntu-14.04-amd64"

    config.vm.provider :virtualbox do |p|
         p.customize ["modifyvm", :id, "--memory", 2048]
         p.customize ["modifyvm", :id, "--cpus", 2]
    end

    config.vm.network "forwarded_port", guest: 8080, host: 8080

    config.vm.provision "docker" do |d|
    end

    config.vm.provision "shell", path: "script.sh"

end
