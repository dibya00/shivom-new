'use client';
import { PageBanner } from '@/components/layout/PageBanner';
import { useCareers, useApplyCareer } from '@/hooks/useCareers';
import { ICareer } from '@/types';
import { Loader2, Briefcase, MapPin, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

export default function CareersPage() {
  const { data: careers = [], isLoading } = useCareers();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<ICareer | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resumeUrl: '',
  });
  
  const [formSuccess, setFormSuccess] = useState(false);
  const { mutate: apply, isPending, error } = useApplyCareer();

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleApplyClick = (job: ICareer) => {
    setSelectedJob(job);
    setFormSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      coverLetter: '',
      resumeUrl: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    // Simulate uploading resume or simply use entered URL
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      coverLetter: formData.coverLetter,
      resumeUrl: formData.resumeUrl || 'https://example.com/resume.pdf',
    };

    apply(
      { slug: selectedJob.slug, payload },
      {
        onSuccess: (success) => {
          if (success) {
            setFormSuccess(true);
          }
        }
      }
    );
  };

  return (
    <>
      <PageBanner 
        title="Careers at Shivom" 
        breadcrumb="Careers" 
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000" 
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Join Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Build the Infrastructure of Tomorrow
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full mb-6" />
            <p className="text-gray-600 text-lg leading-relaxed">
              We recruit engineers, surveyors, project leads, and technicians committed to excellence. Review our open requirements below.
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Checking current job requirements...</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-150 shadow-inner max-w-3xl mx-auto">
              <p className="text-gray-500 text-lg font-medium">There are no open positions currently. Please submit your resume to careers@shivomgroup.com for future options.</p>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {careers.map((job: ICareer) => {
                const isExpanded = expandedId === job._id;
                return (
                  <div 
                    key={job._id} 
                    className="border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div 
                      onClick={() => toggleExpand(job._id)}
                      className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="bg-brand-navy/10 text-brand-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400 font-semibold uppercase">
                            <Clock className="w-3.5 h-3.5 text-brand-orange" />
                            {job.type}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-brand-navy">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {job.location}
                          </span>
                          {job.experience && (
                            <span className="flex items-center gap-1.5">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              Exp: {job.experience}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <ChevronDown 
                        className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-brand-orange' : ''}`} 
                      />
                    </div>

                    {isExpanded && (
                      <div className="px-6 pb-8 pt-2 border-t border-gray-50 bg-gray-50/30">
                        <div className="prose max-w-none text-gray-600 mb-8">
                          <h4 className="font-bold text-brand-navy mb-2">Role Description</h4>
                          <p dangerouslySetInnerHTML={{ __html: job.description }} />
                        </div>
                        
                        {job.requirements && job.requirements.length > 0 && (
                          <div className="mb-8">
                            <h4 className="font-bold text-brand-navy mb-4">Requirements</h4>
                            <ul className="space-y-2.5">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2.5 text-gray-600 text-sm md:text-base">
                                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {job.responsibilities && job.responsibilities.length > 0 && (
                          <div className="mb-8">
                            <h4 className="font-bold text-brand-navy mb-4">Responsibilities</h4>
                            <ul className="space-y-2.5">
                              {job.responsibilities.map((resp, index) => (
                                <li key={index} className="flex items-start gap-2.5 text-gray-600 text-sm md:text-base">
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-navy shrink-0 mt-2.5" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex justify-end pt-4 border-t border-gray-100">
                          <Button onClick={() => handleApplyClick(job)}>
                            Apply Now
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Career Application Modal */}
      <Modal isOpen={!!selectedJob} onClose={() => setSelectedJob(null)}>
        {selectedJob && (
          <div>
            {formSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-brand-navy mb-2">Application Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for applying for the position of <strong>{selectedJob.title}</strong>. Our HR division will get in touch with you shortly.
                </p>
                <Button variant="secondary" onClick={() => setSelectedJob(null)}>
                  Close Window
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-brand-navy">Apply for Position</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Role: <strong>{selectedJob.title}</strong> ({selectedJob.department})
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-brand-navy">Full Name</label>
                    <Input 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-brand-navy">Email Address</label>
                    <Input 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-brand-navy">Phone Number</label>
                    <Input 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-brand-navy">Resume PDF URL</label>
                    <Input 
                      name="resumeUrl" 
                      type="url" 
                      placeholder="https://example.com/resume.pdf"
                      value={formData.resumeUrl} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-brand-navy">Cover Letter / Introduction</label>
                  <Textarea 
                    name="coverLetter" 
                    value={formData.coverLetter} 
                    onChange={handleInputChange} 
                    rows={4}
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg">
                    {error.message || 'Submission failed. Please try again.'}
                  </div>
                )}

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
                  <Button variant="secondary" type="button" onClick={() => setSelectedJob(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
