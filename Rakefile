require 'rubygems'
require 'crxmake'

task :default => :crxmake

desc 'create crx'
task :crxmake do
  CrxMake.make(
               :ex_dir => './src',
               :crx_output => './package/cv_face.crx'
               )
end

desc 'create zip for Google Extension Gallery'
task :zip do
  CrxMake.zip(
               :ex_dir => './src',
               :zip_output => './package/cv_face.zip'
               )
end
