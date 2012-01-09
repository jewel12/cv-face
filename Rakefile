require 'rubygems'
require 'crxmake'

task :default => :crxmake

desc 'make chrome extension'
task :crxmake do
  CrxMake.make(
               :ex_dir => './src',
               :crx_output => './package/cv_face.crx'
               )
end
